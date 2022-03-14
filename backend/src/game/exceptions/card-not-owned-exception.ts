import {WsException} from "@nestjs/websockets";

export class CardNotOwnedException extends WsException {
    constructor() {
        super("bug: card is not owned by player");
    }

}
