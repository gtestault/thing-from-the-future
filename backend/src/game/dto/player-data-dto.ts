import {Card} from "thing-from-the-future-utils";

export class PlayerDataDto {
    username: string
    isCurrentPlayer: boolean
    cards: Card[]
    futureThing: string
}
