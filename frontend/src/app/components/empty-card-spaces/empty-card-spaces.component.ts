import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Card} from "thing-from-the-future-utils";
import * as _ from "lodash";

@Component({
  selector: 'app-empty-card-spaces',
  templateUrl: './empty-card-spaces.component.html',
  styleUrls: ['./empty-card-spaces.component.scss']
})
export class EmptyCardSpacesComponent implements OnInit {
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
  constructor() { }

  ngOnInit(): void {
  }


}
