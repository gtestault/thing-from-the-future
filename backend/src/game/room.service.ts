import {Injectable, Logger} from '@nestjs/common';
import * as xkcd from "xkcd-password"
import {Player} from "../player/schemas/player.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {GameState, PlayerCards, PlayerStories, Room, RoomDocument} from "./schemas/room.schema";
import * as _ from "lodash"
import {Socket} from "socket.io";
import {Card, DeckBuilder} from "thing-from-the-future-utils";
import {ActionNotAllowedException} from "./exceptions/action-not-allowed-exception";
import {CardTypeAlreadyPlayedException} from "./exceptions/card-type-already-played-exception";
import {NotYourTurnException} from "./exceptions/not-your-turn-exception";
import {CardNotOwnedException} from "./exceptions/card-not-owned-exception";
import {RoomAdminActionException} from "./exceptions/room-admin-action-exception";
import {PlayerDataDto} from "./dto/player-data-dto";
import {GameTickDTO} from "./dto/game-tick-dto";
import {PlayerDoesNotExistException} from "./exceptions/player-does-not-exist-exception";
import {AlreadyVotedException} from "./exceptions/already-voted-exception";

@Injectable()
export class RoomService {
    private readonly logger = new Logger(RoomService.name);
    private static PLAYER_CARDS_COUNT = 6
    private static PLAYFIELD_MAX_CARDS = 4
    public static PLAYER_TURN_TIME_SECONDS = 30
    private static BRAINSTORM_PLAYTIME_SECONDS = 240
    private static IDEA_SELECTION_PLAYTIME_SECONDS = 180

    constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) {
    }

    private async getRoomById(roomId: string): Promise<RoomDocument> {
        return await this.roomModel.findById(roomId).populate(["currentPlayer", "players", "admin", "playerQueue", "winner"]).exec()
    }

    /**
     * Creates a room for a thing-for-the-future game
     * @param player will be the host of the room, and can change the room settings (e.g. time limit for brainstorming)
     *
     * returns the id of the created room
     */
    async createRoom(player: Player): Promise<string> {
        const passphrase = await (new xkcd()).generate({numWords: 3});
        const roomId = passphrase.join('-')
        const room = new this.roomModel({_id: roomId, admin: player})
        room.playerCards = {}
        room.playerStories = {}
        room.playerPoints = {}
        await room.markModified("playerCards")
        await room.markModified("playerStories")
        await room.markModified("playerPoints")
        await room.save()
        this.logger.log(`created new room with id: ${roomId} with admin ${player.username}`)
        return roomId
    }

    async joinRoom(roomId: string, player: Player, playerSocket: Socket) {
        const previousRoom = await this.getPlayerRoom(player._id);
        if (previousRoom) {
            await this.leaveRoom(previousRoom._id, player)
            playerSocket.leave(previousRoom._id)
        }
        let room = await this.roomModel.findById(roomId).exec()
        const playerAlreadyInRoom = _.includes(room.players, player._id)
        if (playerAlreadyInRoom) {
            return
        }
        playerSocket.join(roomId)
        room.players = [...room.players, player]
        await room.save()
    }

    async submitStory(roomId: string, player: Player, story: string) {
        let room = await this.getRoomById(roomId)
        if (room.gameState !== GameState.PLAYING_BRAINSTORM) {
            throw new ActionNotAllowedException()
        }
        room.playerStories[player.username] = story
        const everyBodyHasWrittenStory = Object.keys(room.playerStories).length == room.players.length
        if (everyBodyHasWrittenStory) {
           room.gameState = GameState.PLAYING_IDEA_SELECTION
        }
        room.markModified('playerStories')
        await room.save()
    }
    async submitVote(roomId: string, player: Player, username: string) {
        let room = await this.getRoomById(roomId)
        if (room.gameState !== GameState.PLAYING_IDEA_SELECTION) {
            throw new ActionNotAllowedException()
        }
        if (_.includes(room.playerQueue.map(p => p.username), player.username)) {
           throw new AlreadyVotedException()
        }
        if (!_.includes(room.players.map(p => p.username), username)) {
            throw new PlayerDoesNotExistException()
        }
        room.playerPoints[username] += 1
        room.playerQueue = [...room.playerQueue, player]
        const everyBodyHasVoted = _.sum(Object.values(room.playerPoints)) >= room.players.length
        if (everyBodyHasVoted) {
            let max = 0
            for (let player of room.players) {
                if (room.playerPoints[player.username] > max) {
                   room.winner = player
                }
            }
            room.gameState = GameState.WINNER_ANNOUNCEMENT
        }
        room.markModified('playerPoints')
        await room.save()
    }

    async startGame(roomId: string, player: Player) {
        let room = await this.getRoomById(roomId)
        if (room.admin._id !== player._id) {
            throw new RoomAdminActionException()
        }
        room.timeRemaining = RoomService.PLAYER_TURN_TIME_SECONDS
        room.gameState = GameState.PLAYING_PLAYFIELD
        const deck = DeckBuilder.getInstance().baseDeck()
        for (const player of room.players) {
            let playerCards: Card[] = []
            for (let i = 0; i < RoomService.PLAYER_CARDS_COUNT; i++) {
                playerCards.push(deck.drawRandomWithReplacement())
            }
            room.playerCards[player.username] = playerCards
            room.playerPoints[player.username] = 0
        }
        room.deck = deck
        room.playerQueue = room.players;
        room.currentPlayer = room.playerQueue.shift()
        room.markModified("deck")
        room.markModified("playerCards")
        room.markModified("playerPoints")
        await room.save()
    }

    async decreaseTime(roomId) {
        let room = await this.getRoomById(roomId)
        switch (room.gameState) {
            case GameState.WAITING_ROOM:
                return
            case GameState.PLAYING_PLAYFIELD:
                room.timeRemaining -= 1
                await room.save()
                // if timer expires during playfield gameplay, let next player play.
                if (room.timeRemaining <= 0) {
                    await this.nextPlayerPlayfield(roomId)
                }
                break;
            case GameState.PLAYING_BRAINSTORM:
                room.timeRemaining -= 1
                if (room.timeRemaining <= 0) {
                    //TODO: What happens if no ideas?
                    room.gameState = GameState.PLAYING_IDEA_SELECTION
                    room.timeRemaining = RoomService.IDEA_SELECTION_PLAYTIME_SECONDS
                }
                await room.save()
                break;
            case GameState.PLAYING_IDEA_SELECTION:
                room.timeRemaining -= 1
                room.playerQueue = []
                if (room.timeRemaining <= 0) {
                    room.gameState = GameState.WINNER_ANNOUNCEMENT
                }
                await room.save()
                break;
            default:
                return
        }
    }

    async playCard(roomId: string, player: Player, card: Card) {
        let room = await this.getRoomById(roomId)
        if (room.gameState !== GameState.PLAYING_PLAYFIELD) {
            throw new ActionNotAllowedException()
        }
        if (_.includes(room.playedCards.map(p => p.kind), card.kind)) {
            throw new CardTypeAlreadyPlayedException()
        }
        if (player._id !== room.currentPlayer._id) {
            throw new NotYourTurnException()
        }
        let playerCards = room.playerCards[player.username]
        if (!_.find(playerCards, c => c.kind === card.kind)) {
            throw new CardNotOwnedException()
        }
        if (_.find(room.playedCards, c => c.kind === card.kind)) {
            throw new CardTypeAlreadyPlayedException()
        }
        room.playedCards = [...room.playedCards, card]
        if (room.playedCards.length === RoomService.PLAYFIELD_MAX_CARDS) {
            //all cards slots have been filled, continue with  brainstorm phase
            room.gameState = GameState.PLAYING_BRAINSTORM
            room.timeRemaining = RoomService.BRAINSTORM_PLAYTIME_SECONDS
            await room.save()
            return
        }
        await this.nextPlayerPlayfield(roomId)
        room.markModified("playerCards")
        room.markModified("playedCards")
        await room.save();
    }

    async swapCards(roomId, player: Player) {
        let room = await this.getRoomById(roomId)
        if (room.gameState !== GameState.PLAYING_PLAYFIELD) {
            throw new ActionNotAllowedException()
        }
        if (player._id !== room.currentPlayer._id) {
            throw new NotYourTurnException()
        }
        let newPlayerCards: Card[] = []
        const cardDeck = DeckBuilder.getInstance().baseDeck()
        for (let i = 0; i < RoomService.PLAYER_CARDS_COUNT; i++) {
            newPlayerCards.push(cardDeck.drawRandomWithReplacement())
        }
        room.playerCards[player.username] = newPlayerCards
        room.markModified("playerCards")
        await this.nextPlayerPlayfield(roomId)
        await room.save()
    }

    async nextPlayerPlayfield(roomId: string) {
        let room = await this.getRoomById(roomId)
        if (room.playerQueue.length === 0) {
            room.playerQueue = room.players
            room.currentPlayer = room.playerQueue.shift()
        } else {
            room.currentPlayer = room.playerQueue.shift()
        }
        room.timeRemaining = RoomService.PLAYER_TURN_TIME_SECONDS
        await room.save()
    }

    async getRoom(roomId: string): Promise<Room> {
        return await this.getRoomById(roomId)
    }

    async getPlayerRoom(playerId: string): Promise<Room> {
        // @ts-ignore
        return await this.roomModel.findOne({players: playerId}).exec()
    }

    async deleteRoom(roomId: string) {
        await this.roomModel.findByIdAndDelete(roomId).exec()
    }

    async allRooms(): Promise<Room[]> {
        return await this.roomModel.find({}).populate(["currentPlayer", "players", "admin", "playerQueue", "winner"]).exec()
    }

    async leaveRoom(roomId: string, player: Player) {
        let room = await this.getRoomById(roomId)
        room.players = room.players.filter(p => p._id !== player._id)
        if (room.players.length == 0) {
            await room.delete()
            return
        }
        await room.save()
    }

    getGameData(room: Room): GameTickDTO {
        const gameData: GameTickDTO = {
            roomId: room._id,
            playedCards: room.playedCards,
            winner: room.winner,
            players: this.getAggregatedPlayerData(room.players, room.playerQueue, room.playerCards, room.playerStories, room.currentPlayer),
            timeRemaining: room.timeRemaining,
            admin: room.admin,
            gameState: room.gameState
        }
        return gameData
    }

    getAggregatedPlayerData(players: Player[], playerQueue: Player[], playerCards: PlayerCards, playerStories: PlayerStories, currentPlayer: Player): PlayerDataDto[] {
        const playerData: PlayerDataDto[] = []
        for (let player of players) {
            const data: PlayerDataDto = {
                username: player.username,
                isCurrentPlayer: currentPlayer && currentPlayer._id === player._id,
                cards: playerCards[player.username],
                futureThing: playerStories[player.username],
            }
            playerData.push(data)
        }
        return playerData
    }

    async getPlayers(roomId: string): Promise<Player[]> {
        let room = await this.roomModel.findById(roomId).exec()
        return room.players
    }
}
