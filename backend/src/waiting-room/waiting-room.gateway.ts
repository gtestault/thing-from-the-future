import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';
import {CreateRoomRequest} from "./models/create-room-request.interface";

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class WaitingRoomGateway {
    @WebSocketServer()
    server: Server;


    @SubscribeMessage('room-broker')
    async identity(@MessageBody() req: CreateRoomRequest): Promise<WsResponse<unknown>> {
        console.log(req.roomName)
        return {event: "room-broker", data: "ok"};
    }
}
