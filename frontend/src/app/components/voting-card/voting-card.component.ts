import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-voting-card',
  templateUrl: './voting-card.component.html',
  styleUrls: ['./voting-card.component.scss']
})
export class VotingCardComponent implements OnInit {

  @HostBinding('style.voted')
  border = '2px solid $tftf-green';

  @Input() text = '';

  voted = false;

  constructor() { }

  ngOnInit(): void {
  }

  vote() {
    this.voted = true;
  }

}
