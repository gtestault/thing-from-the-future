import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-voting-card',
  templateUrl: './voting-card.component.html',
  styleUrls: ['./voting-card.component.scss']
})
export class VotingCardComponent implements OnInit {

  @HostBinding('style.border')
  border = '5px solid #FFF7CA';

  @Input() text = '';

  voted = false;

  constructor() { }

  ngOnInit(): void {
  }

  vote() {
    this.voted = true;
    this.border = '5px solid #36B722';
  }

}
