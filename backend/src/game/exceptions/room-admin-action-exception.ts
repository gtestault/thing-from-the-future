import {WsException} from "@nestjs/websockets";

export class RoomAdminActionException extends WsException {
    constructor() {
        super("only the room administrator can make this action");
    }
}
