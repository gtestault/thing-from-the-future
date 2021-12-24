import {
    BaseWsExceptionFilter,
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import {Logger, UseFilters, UseGuards, UsePipes, ValidationPipe} from "@nestjs/common";
import {BadRequestTransformationFilter} from "./filters/bad-request-transformation";
import {JOIN_ROOM_ACTION, NEW_ROOM_ACTION} from "./actions/actions";
import {RoomService} from "./room.service";
import {NewRoomDTO} from "./dto/new-room";
import {WsGuard} from "../authentication/guards/ws.guard";
import {PlayerFetcher} from "../authentication/decorators/player-fetcher";
import {Player} from "../player/schemas/player.schema";
import {JoinRoomDto} from "./dto/join-room-dto";
import {Interval} from "@nestjs/schedule";
import {WaitingRoomTickDTO} from "./dto/waiting-room-tick-dto";
import * as _ from "lodash"

const NAMESPACE = "waiting-room"

@UseFilters(new BadRequestTransformationFilter())
@UseFilters(new BaseWsExceptionFilter())
@UsePipes(new ValidationPipe({}))
@UseGuards(WsGuard)
@WebSocketGateway({
    cors: {
        origin: '*',
    },
    namespace: NAMESPACE
})
export class WaitingRoomGateway {
    constructor(private roomService: RoomService) {
    }

    @WebSocketServer()
    server: Server;
    private readonly logger = new Logger(WaitingRoomGateway.name);

    @SubscribeMessage(NEW_ROOM_ACTION)
    async newRoom(
        @MessageBody() newRoom: NewRoomDTO,
        @ConnectedSocket() s: Socket,
        @PlayerFetcher() p: Player
    ) {
        this.logger.log(`create room request from ${p._id}`)
        const roomId = await this.roomService.createRoom(p)
        await this.roomService.joinRoom(roomId, p)
        s.join(roomId)
        return roomId
    }

    @SubscribeMessage(JOIN_ROOM_ACTION)
    async joinRoom(
        @MessageBody() joinRoom: JoinRoomDto,
        @ConnectedSocket() s: Socket,
        @PlayerFetcher() p: Player
    ) {
        await this.roomService.joinRoom(joinRoom.roomId, p)
        s.join(joinRoom.roomId)
        return
    }

    @Interval(1000)
    async waitingRoomTick() {
        const rooms = await this.roomService.allRooms()
        for (const room of rooms) {
            // @ts-ignore
            const roomsAdapter = this.server.adapter.rooms
            if (!roomsAdapter.get(room._id) || roomsAdapter.get(room._id).length == 0) {
                this.roomService.deleteRoom(room._id)
                continue
            }
            const playerInfo = room.players.map(p => _.pick(p, "username"))
            const tick: WaitingRoomTickDTO = {players: playerInfo}
            this.server.to(room._id).emit('update', JSON.stringify(tick))
        }
    }
}
