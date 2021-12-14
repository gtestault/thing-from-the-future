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
  @Input() term2 = "";
  @Input() time = ""

  turnAround = false;

  ngOnInit(): void {

  }

  turnCard() {
    if (this.term2) {
      this.turnAround = !this.turnAround;
    }
  }

}
