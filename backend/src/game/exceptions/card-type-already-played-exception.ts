import {WsException} from "@nestjs/websockets";

export class CardTypeAlreadyPlayedException extends WsException {
    constructor() {
        super("a card of this type has already been played, you cannot play this card");
    }
}
