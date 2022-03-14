import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-draw-board',
  templateUrl: './draw-board.component.html',
  styleUrls: ['./draw-board.component.scss']
})
export class DrawBoardComponent implements OnInit {
  mouseDown = false

  constructor() { }

  ngOnInit(): void {
  }

}
