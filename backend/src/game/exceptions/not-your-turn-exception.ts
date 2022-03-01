import {WsException} from "@nestjs/websockets";

export class NotYourTurnException extends WsException {
    constructor() {
        super("it's not your turn to play a card");
    }
}
