import {WsException} from "@nestjs/websockets";
export class AlreadyVotedException extends WsException {
    constructor() {
        super("you already voted and cannot vote again");
    }
}