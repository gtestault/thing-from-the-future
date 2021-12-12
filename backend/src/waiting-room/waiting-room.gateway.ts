import {
    BaseWsExceptionFilter,
    ConnectedSocket,
    MessageBody, OnGatewayConnection, OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import {NewPlayerDTO} from "./dto/new-player";
import {Logger, UseFilters, UsePipes, ValidationPipe} from "@nestjs/common";
import {BadRequestTransformationFilter} from "./filters/bad-request-transformation";
import {NEW_PLAYER_ACTION, NEW_ROOM_ACTION} from "./actions/actions";
import {RoomService} from "./room.service";
import {PlayerService} from "./player.service";
import {Player} from "./models/player";
import {UsernameNotSetException} from "./exceptions/username-not-set-exception";
import {OkResponse} from "./responses/ok-response";
import {NewRoomDTO} from "./dto/new-room";

@UseFilters(new BadRequestTransformationFilter())
@UseFilters(new BaseWsExceptionFilter())
@UsePipes(new ValidationPipe({}))
@WebSocketGateway({
    cors: {
        origin: '*',
    },
    namespace: "waiting-room"
})
export class WaitingRoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private roomService: RoomService, private playerService: PlayerService) {
    }
    @WebSocketServer()
    server: Server;
    private readonly logger = new Logger(WaitingRoomGateway.name);

    @SubscribeMessage(NEW_PLAYER_ACTION)
    async newPlayer(@MessageBody() newPlayer: NewPlayerDTO, @ConnectedSocket() s: Socket) {
        this.logger.log(`new player from socket '${s.id}' registered with username '${newPlayer.username}'`)
        this.playerService.newPlayer(new Player(s.id, newPlayer.username))
        return OkResponse
    }

    @SubscribeMessage(NEW_ROOM_ACTION)
    async newRoom(@MessageBody() newRoom: NewRoomDTO, @ConnectedSocket() s: Socket) {
        const player = this.playerService.getPlayerById(s.id)
        if (!player) {
            throw new UsernameNotSetException()
        }
        return this.roomService.createRoom(player)
    }

    handleConnection(client: Socket, ...args: any[]): any {
        this.logger.log(`client connected to waiting-room with socket id: '${client.id}'`)
    }

    handleDisconnect(client: Socket): any {
        this.playerService.removePlayer(client.id)
    }
}
