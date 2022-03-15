import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.scss']
})
export class ResultCardComponent implements OnInit {

  @HostBinding('style.border')
  border = '5px solid #FFF7CA';

  @Input() text = '';
  @Input() author = '';
  constructor() { }

  ngOnInit(): void {
  }

}
