import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brainstorm',
  templateUrl: './brainstorm.component.html',
  styleUrls: ['./brainstorm.component.scss']
})
export class BrainstormComponent implements OnInit {

  storySubmitted = false;

  constructor() { }

  ngOnInit(): void {
  }

  submit() {
    this.storySubmitted = true;
  }

}
