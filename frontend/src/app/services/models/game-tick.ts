import {Player} from './player';
import {Card} from 'thing-from-the-future-utils';
import {PlayerData} from "./player-data";


export type PlayerCards = {[username: string]: Card};
export interface GameTick {
  timeRemaining: number;
  roomId: string;
  players: PlayerData[];
  admin: Player;
  gameState: string;
}
