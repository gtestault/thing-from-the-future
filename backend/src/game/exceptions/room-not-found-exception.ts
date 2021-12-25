import {WsException} from "@nestjs/websockets";

export class RoomNotFoundException extends WsException {
    constructor() {
        super("room not found");
    }
}