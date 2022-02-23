import {Injectable, Logger} from '@nestjs/common';
import * as xkcd from "xkcd-password"
import {Player} from "../player/schemas/player.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {GameState, Room, RoomDocument} from "./schemas/room.schema";
import * as _ from "lodash"
import {Socket} from "socket.io";
import {Card, DeckBuilder} from "thing-from-the-future-utils";

@Injectable()
export class RoomService {
    private readonly logger = new Logger(RoomService.name);
    private static PLAYER_CARDS_COUNT = 7
    constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) { }

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
        await room.markModified("playerCards")
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

    async startGame(roomId: string) {
        let room = await this.roomModel.findById(roomId).populate(["players", "admin", "playerCards"]).exec()
        room.gameState = GameState.PLAYING_PLAYFIELD
        const deck = DeckBuilder.getInstance().baseDeck()
        for (const player of room.players) {
            let playerCards: Card[] = []
            for (let i = 0; i < RoomService.PLAYER_CARDS_COUNT; i++) {
                playerCards.push(deck.drawRandom())
            }
            room.playerCards[player.username] = playerCards
        }
        room.deck = deck
        room.playerQueue = room.players;
        room.currentPlayer = room.playerQueue[0]
        room.markModified("deck")
        room.markModified("playerCards")
        await room.save()
    }

    async getRoom(roomId: string): Promise<Room> {
        return await this.roomModel.findById(roomId).populate(["players", "admin"]).exec()
    }

    async getPlayerRoom(playerId: string): Promise<Room> {
        // @ts-ignore
        return await this.roomModel.findOne({players: playerId}).exec()
    }

    async deleteRoom(roomId: string) {
        await this.roomModel.findByIdAndDelete(roomId).exec()
    }

    async allRooms(): Promise<Room[]> {
        return await this.roomModel.find({}).populate('players').exec()
    }

    async leaveRoom(roomId: string, player: Player) {
        let room = await this.roomModel.findById(roomId).populate('players').exec()
        room.players = room.players.filter(p => p._id !== player._id)
        if (room.players.length == 0) {
            await room.delete()
            return
        }
        await room.save()
    }
    async getPlayers(roomId: string): Promise<Player[]> {
        let room = await this.roomModel.findById(roomId).exec()
        return room.players
    }
}
