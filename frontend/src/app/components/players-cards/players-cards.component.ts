import { Component, OnInit } from '@angular/core';
import {Card} from '../../../models/Card';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-players-cards',
  templateUrl: './players-cards.component.html',
  styleUrls: ['./players-cards.component.scss']
})
export class PlayersCardsComponent implements OnInit {

  cards: Card[] = [
    {
      category: "object",
      term: "postcard",
      term2: "",
      time: ""
    },
    {
      category: "mood",
      term: "melancholy",
      term2: "",
      time: ""
    },
    {
      category: "terrain",
      term: "grandma's house",
      term2: "water",
      time: ""
    },
    {
      category:  "arc",
      term: "grow",
      term2: "",
      time: ""
    },
    {
      category: "object",
      term: "postcard",
      term2: "",
      time: ""
    },
    {
      category: "mood",
      term: "melancholy",
      term2: "",
      time: ""
    },
    {
      category: "terrain",
      term: "grandma's house",
      term2: "water",
      time: ""
    },
    {
      category:  "arc",
      term: "grow",
      term2: "",
      time: ""
    },
    {
      category: "object",
      term: "postcard",
      term2: "",
      time: ""
    },
    {
      category: "mood",
      term: "melancholy",
      term2: "",
      time: ""
    },
    {
      category: "terrain",
      term: "grandma's house",
      term2: "water",
      time: ""
    },
    {
      category:  "arc",
      term: "grow",
      term2: "",
      time: ""
    },
  ];


  constructor() { }

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
