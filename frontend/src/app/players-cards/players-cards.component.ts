import { Component, OnInit } from '@angular/core';
import {Card} from '../../models/Card';

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

}
