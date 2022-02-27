import {WsException} from "@nestjs/websockets";

export class ActionNotAllowedException extends WsException {
    constructor() {
        super("action is not allowed");
    }

}
