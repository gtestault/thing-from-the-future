import {Player} from './player';
import {Card} from 'thing-from-the-future-utils';


export type PlayerCards = {[username: string]: Card};
export interface GameTick {
  timeRemaining: number;
  roomId: string;
  players: Player[];
  playerQueue: Player[];
  playerCards: PlayerCards;
  currentPlayer: Player;
  admin: Player;
}
