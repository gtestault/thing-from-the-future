import { Component, OnInit } from '@angular/core';
import {Card} from '../../../models/Card';
import {CardService} from '../../services/card.service';

@Component({
  selector: 'app-brainstorm',
  templateUrl: './brainstorm.component.html',
  styleUrls: ['./brainstorm.component.scss']
})
export class BrainstormComponent implements OnInit {

  storySubmitted = false;
  playedCards: Card[] = [];

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    this.cardService.playedCards.subscribe(playedCards => {
      this.playedCards = playedCards;
    })
  }

  submit() {
    this.storySubmitted = true;
  }

}
