import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  @Input() counterStart: number = 0;

  constructor() {

  }

  ngOnInit(): void {
    this.countDown();
  }

  countDown() {
    let intervalId = setInterval(() => {
      this.counterStart = this.counterStart - 1;
      if(this.counterStart === 0) clearInterval(intervalId)
    }, 1000)
  }
}
