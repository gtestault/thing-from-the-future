import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor() { }

  @HostBinding('style.position')
  position = 'relative';

  @Input() category = "";
  @Input() term = "";
  @Input() time = ""

  dragPosition = {x: 0, y: 0};
  positionAbsolute = false;

  ngOnInit(): void {

  }

  playCard(category: string, term: string) {
    // if ( // noch nicht gelegt ) {
    this.position = 'absolute';
      if (category === 'arc') {
       this.dragPosition = {x: 120, y: -280};
      } else if (category === 'terrain') {
        this.dragPosition = {x: 280, y: -280};
      } else if (category === 'object') {
        this.dragPosition = {x: 440, y: -280};
      } else if (category === 'mood') {
        this.dragPosition = {x: 600, y: -280};
      } else {
      }
    //
    // }


    // this.dragPosition = {x: this.dragPosition.x + 50, y: this.dragPosition.y + 50};
  }
}
