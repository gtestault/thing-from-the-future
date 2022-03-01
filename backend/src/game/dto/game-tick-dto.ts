import {Player} from "../../player/schemas/player.schema";
import {PlayerCards} from "../schemas/room.schema";

export class GameTickDTO {
    roomId: string
    admin: Player
    players: Player[]
    playerCards: PlayerCards
    playerQueue: Player[]
    currentPlayer: Player
    timeRemaining: number
}
