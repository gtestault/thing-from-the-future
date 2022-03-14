import {Card} from "thing-from-the-future-utils";

export interface PlayerData {
  username: string;
  isCurrentPlayer: boolean;
  cards: Card[];
}
