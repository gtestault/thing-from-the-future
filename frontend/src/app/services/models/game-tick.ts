import {Player} from "./player";

export interface GameTick {
  roomId: string
  players: Player[]
}
