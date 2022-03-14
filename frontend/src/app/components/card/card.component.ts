import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {CardService} from '../../services/card.service';
import {Card} from '../../../models/Card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor(private cardService: CardService) { }

  @HostBinding('style.position')
  position = 'relative';

  @Input() category = "";
  @Input() term = "";
  @Input() time = ""

  dragPosition = {x: 0, y: 0};
  positionAbsolute = false;
  playedCards: Card[] = [
    {category: '',
    term: '',
    time: ''},
    {category: '',
    term: '',
    time: ''},
    {category: '',
    term: '',
    time: ''},
    {category: '',
    term: '',
    time: ''}];

  ngOnInit(): void {
    this.cardService.playedCards.subscribe(playedCards => {
      this.playedCards = playedCards;
    })
  }

  playCard(category: string, term: string, time: string) {
    if (this.position === 'relative') {
      if (category === 'arc') {
        if (!this.playedCards[0].category) {
          this.position = 'absolute';
          this.dragPosition = {x: 120, y: -280};
          this.playedCards[0] = {
            category: category,
            term: term,
            time: time,
          };
          this.cardService.playedCards.next(this.playedCards);
        } else {
          alert('Category already played');
        }
      } else if (category === 'terrain') {
        if (!this.playedCards[1].category) {
          this.position = 'absolute';
          this.dragPosition = {x: 280, y: -280};
          this.playedCards[1] = {
            category: category,
            term: term,
            time: time,
          };
          this.cardService.playedCards.next(this.playedCards);
        } else {
          alert('Category already played');
        }

      } else if (category === 'object') {
        if (!this.playedCards[2].category) {
          this.position = 'absolute';
          this.dragPosition = {x: 440, y: -280};
          this.playedCards[2] = {
            category: category,
            term: term,
            time: time,
          };
          this.cardService.playedCards.next(this.playedCards);
        } else {
          alert('Category already played');
        }
      } else if (category === 'mood') {
        if (!this.playedCards[3].category) {
          this.position = 'absolute';
          this.dragPosition = {x: 600, y: -280};
          this.playedCards[3] = {
            category: category,
            term: term,
            time: time
          };
          this.cardService.playedCards.next(this.playedCards);
        } else {
          alert('Category already played');
        }
      }
    }
    //TODO: set next Player
  }
}
