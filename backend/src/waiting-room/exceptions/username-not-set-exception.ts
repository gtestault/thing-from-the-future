import {WsException} from "@nestjs/websockets";
import {NEW_PLAYER_ACTION} from "../actions/actions";

export class UsernameNotSetException extends WsException {
    constructor() {
        super(`the action requires the username to be set over the ${NEW_PLAYER_ACTION} WS endpoint`);
    }
}
