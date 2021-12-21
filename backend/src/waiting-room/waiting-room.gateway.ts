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
import {NEW_ROOM_ACTION} from "./actions/actions";
import {RoomService} from "./room.service";
import {NewRoomDTO} from "./dto/new-room";
import {WsGuard} from "../authentication/guards/ws.guard";
import {PlayerFetcher} from "../authentication/decorators/player-fetcher";
import {Player} from "../player/schemas/player.schema";

@UseFilters(new BadRequestTransformationFilter())
@UseFilters(new BaseWsExceptionFilter())
@UsePipes(new ValidationPipe({}))
@UseGuards(WsGuard)
@WebSocketGateway({
    cors: {
        origin: '*',
    },
    namespace: "waiting-room"
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
        this.logger.log(`create room requset from ${p._id}`)
        return
    }
}
