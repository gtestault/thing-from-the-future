import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Card} from '../../../models/Card';

@Component({
  selector: 'app-empty-card-spaces',
  templateUrl: './empty-card-spaces.component.html',
  styleUrls: ['./empty-card-spaces.component.scss']
})
export class EmptyCardSpacesComponent implements OnInit {

  cards: Card[] = [
  ]

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
