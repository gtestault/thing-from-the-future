import {WsException} from "@nestjs/websockets";

export class PlayerDoesNotExistException extends WsException {
    constructor() {
        super("unknown vote target");
    }
}
