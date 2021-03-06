import {
    ConnectedSocket,
    MessageBody, OnGatewayConnection, OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import {Logger, UseFilters, UseGuards, UsePipes, ValidationPipe} from "@nestjs/common";
import {BadRequestTransformationFilter} from "./filters/bad-request-transformation";
import {
    JOIN_ROOM_ACTION, LEAVE_ROOM_ACTION,
    NEW_ROOM_ACTION,
    PLAY_CARD_ACTION,
    START_GAME_ACTION, SUBMIT_STORY_ACTION, SUBMIT_VOTE_ACTION,
    SWAP_CARDS_ACTION
} from "./actions/actions";
import {RoomService} from "./room.service";
import {EmptyObjectDTO} from "./dto/empty-object-dto";
import {WsGuard} from "../authentication/guards/ws.guard";
import {PlayerFetcher} from "../authentication/decorators/player-fetcher";
import {Player} from "../player/schemas/player.schema";
import {JoinRoomDto} from "./dto/join-room-dto";
import {Interval} from "@nestjs/schedule";
import {GameTickDTO} from "./dto/game-tick-dto";
import {PlayerService} from "../player/player.service";
import {RoomNotFoundException} from "./exceptions/room-not-found-exception";
import {WsAckExceptionFilter} from "./filters/ws-ack-exception-filter";
import {OkResponse} from "./responses/ok-response";
import {PlayCardDto} from "./dto/play-card-dto";
import {LOGOUT_PLAYER_EVENT, GAME_UDPATE_EVENT} from "./events/events";
import {SubmitStoryDto} from "./dto/submit-story-dto";
import {SubmitVoteDto} from "./dto/submit-vote-dto";

@UseFilters(new BadRequestTransformationFilter())
@UseFilters(new WsAckExceptionFilter())
@UsePipes(new ValidationPipe({}))
@UseGuards(WsGuard)
@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class GameGateway implements OnGatewayConnection<Socket>, OnGatewayDisconnect<Socket> {
    constructor(private roomService: RoomService, private playerService: PlayerService) {
    }


    @WebSocketServer()
    server: Server;
    private readonly logger = new Logger(GameGateway.name);

    @SubscribeMessage(NEW_ROOM_ACTION)
    async newRoom(
        @MessageBody() newRoom: EmptyObjectDTO,
        @ConnectedSocket() s: Socket,
        @PlayerFetcher() p: Player
    ) {
        this.logger.log(`create room request from ${p._id}`)
        const roomId = await this.roomService.createRoom(p)
        await this.roomService.joinRoom(roomId, p, s)
        return roomId
    }

    @SubscribeMessage(LEAVE_ROOM_ACTION)
    async leaveRoom(
        @MessageBody() leaveRoomDto: EmptyObjectDTO,
        @ConnectedSocket() s: Socket,
        @PlayerFetcher() p: Player
    ) {
        const playerRoom = await this.roomService.getPlayerRoom(p._id)
        await this.roomService.leaveRoom(playerRoom._id, p)
        this.logger.log(`player ${p.username} left game room ${playerRoom._id}.`)
        return OkResponse
    }

    @SubscribeMessage(JOIN_ROOM_ACTION)
    async joinRoom(
        @MessageBody() joinRoom: JoinRoomDto,
        @ConnectedSocket() s: Socket,
        @PlayerFetcher() p: Player
    ) {
        const room = await this.roomService.getRoom(joinRoom.roomId)
        if (!room) {
            throw new RoomNotFoundException()
        }
        await this.roomService.joinRoom(joinRoom.roomId, p, s)
        s.join(joinRoom.roomId)
        this.logger.log(`'${p.username}' joined room '${joinRoom.roomId}'`)
        return OkResponse
    }

    @SubscribeMessage(SUBMIT_VOTE_ACTION)
    async submitVote(
        @MessageBody() submitVoteDto: SubmitVoteDto,
        @ConnectedSocket() s: Socket,
        @PlayerFetcher() p: Player
    ) {
        const playerRoom = await this.roomService.getPlayerRoom(p._id)
        await this.roomService.submitVote(playerRoom._id, p, submitVoteDto.username)
        this.logger.log(`'${p.username}' voted for the idea of '${submitVoteDto.username}'`)
        return OkResponse
    }

    @SubscribeMessage(START_GAME_ACTION)
    async startGame(
        @MessageBody() emptyObjectDTO: EmptyObjectDTO,
        @ConnectedSocket() s: Socket,
        @PlayerFetcher() p: Player
    ) {
        const playerRoom = await this.roomService.getPlayerRoom(p._id)
        await this.roomService.startGame(playerRoom._id, p)
        return OkResponse
    }

    @SubscribeMessage(SWAP_CARDS_ACTION)
    async swapCards(
        @MessageBody() emptyObjectDTO: EmptyObjectDTO,
        @ConnectedSocket() s: Socket,
        @PlayerFetcher() p: Player
    ) {
        const playerRoom = await this.roomService.getPlayerRoom(p._id)
        await this.roomService.swapCards(playerRoom._id, p)
        this.logger.log("swapped cards for " +  p.username)
        this.sendGameUpdate(playerRoom._id)
        return OkResponse
    }

    @SubscribeMessage(PLAY_CARD_ACTION)
    async playCardAction(
        @MessageBody() playCardDTO: PlayCardDto,
        @ConnectedSocket() s: Socket,
        @PlayerFetcher() p: Player
    ) {
        const playerRoom = await this.roomService.getPlayerRoom(p._id)
        this.logger.log(`card was played: ${JSON.stringify(playCardDTO.card)}`)
        await this.roomService.playCard(playerRoom._id, p, playCardDTO.card)
        this.sendGameUpdate(playerRoom._id)
        return OkResponse
    }

    @SubscribeMessage(SUBMIT_STORY_ACTION)
    async submitStory(
        @MessageBody() submitStoryDto: SubmitStoryDto,
        @ConnectedSocket() s: Socket,
        @PlayerFetcher() p: Player
    ) {
        const playerRoom = await this.roomService.getPlayerRoom(p._id)
        await this.roomService.submitStory(playerRoom._id, p, submitStoryDto.text)
        return OkResponse
    }

    async sendGameUpdate(roomId: string) {
        const room = await this.roomService.getRoom(roomId)
        const tick: GameTickDTO = this.roomService.getGameData(room)
        this.server.to(room._id).emit(GAME_UDPATE_EVENT, JSON.stringify(tick))
    }

    @Interval(1000)
    async gameTick() {
        const rooms = await this.roomService.allRooms()
        for (const room of rooms) {
            const roomsAdapter = this.server.sockets.adapter.rooms
            if (!roomsAdapter.get(room._id) || roomsAdapter.get(room._id).size == 0) {
                this.roomService.deleteRoom(room._id)
                continue
            }
            const tick: GameTickDTO = this.roomService.getGameData(room)
            this.roomService.decreaseTime(room._id)
            this.server.to(room._id).emit(GAME_UDPATE_EVENT, JSON.stringify(tick))
        }
    }

    private static getPlayerIdFromSocket(socket: Socket): string | undefined {
        return socket.handshake.headers.authorization
    }


    async handleDisconnect(socket: Socket) {
        const playerId = GameGateway.getPlayerIdFromSocket(socket)
        const player = await this.playerService.getPlayerById(playerId)
        if (!player) {
            return
        }
        if (player.socketId == socket.id) {
            this.playerService.setPlayerSocketId(playerId, "")
        }
    }

    async handleConnection(socket: Socket) {
        const playerId = GameGateway.getPlayerIdFromSocket(socket)
        const player = await this.playerService.getPlayerById(playerId)
        if (!player) {
            socket.emit(LOGOUT_PLAYER_EVENT, "logout")
            this.logger.log("logged out player since no associated account was found in db")
            return
        }
        await this.playerService.setPlayerSocketId(playerId, socket.id)
        const room = await this.roomService.getPlayerRoom(playerId)
        if (room) {
            socket.join(room._id)
        }
    }
}
