import {Player} from "../../player/schemas/player.schema";

export class GameTickDTO {
    roomId: string
    players: Player[]
}