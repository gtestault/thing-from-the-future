import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Card, CardKind} from "thing-from-the-future-utils";
import * as _ from "lodash";

@Component({
  selector: 'app-players-cards',
  templateUrl: './players-cards.component.html',
  styleUrls: ['./players-cards.component.scss']
})
export class PlayersCardsComponent implements OnInit {
  @Input() cards: Card[] = []
  @Input() isMyTurn: boolean = false
  private _playedCards: Card[] = []
  arcCard: Card | undefined
  moodCard: Card | undefined
  objectCard: Card | undefined
  terrainCard: Card | undefined
  @Input() set playedCards(cards: Card[]) {
    this._playedCards = cards
    this.arcCard = _.find(this._playedCards, (c => c.kind === "arc"))
    this.terrainCard = _.find(this._playedCards, (c => c.kind === "terrain"))
    this.objectCard = _.find(this._playedCards, (c => c.kind === "object"))
    this.moodCard = _.find(this._playedCards, (c => c.kind === "mood"))
  }
  isKindPlayed(kind: CardKind): boolean {
    switch (kind) {
      case "object":
        return !!this.objectCard
      case "terrain":
        return !!this.terrainCard
      case "mood":
        return !!this.moodCard
      case "arc":
        return !!this.arcCard
    }
    return false
  }


  constructor() {
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
