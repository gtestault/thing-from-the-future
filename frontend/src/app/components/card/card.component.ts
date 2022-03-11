import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor() { }

  @Input() category = "";
  @Input() term = "";
  @Input() time = ""

  dragPosition = {x: 0, y: 0};
  positionAbsolute = false;

  ngOnInit(): void {

  }

  changePosition(category: string, position: any) {
    // if ( // noch nicht gelegt ) {
    //
    this.positionAbsolute = !this.positionAbsolute;
      if (category === 'arc') {
        this.dragPosition = {x: 50, y: 50};
      } else if (category === 'terrain') {

      } else if (category === 'object') {
        // berechne position
      } else if (category === 'mood') {
        // berechne position
      } else {
      }
    //
    // }


    // this.dragPosition = {x: this.dragPosition.x + 50, y: this.dragPosition.y + 50};
    console.log(category);
    console.log(position);
    console.log(this.dragPosition);
  }
}
