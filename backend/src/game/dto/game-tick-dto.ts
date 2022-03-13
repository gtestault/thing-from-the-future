import {Player} from "../../player/schemas/player.schema";
import {PlayerDataDto} from "./player-data-dto";
import {Card} from "thing-from-the-future-utils";

export class GameTickDTO {
    roomId: string
    admin: Player
    playedCards: Card[]
    players: PlayerDataDto[]
    timeRemaining: number
}
