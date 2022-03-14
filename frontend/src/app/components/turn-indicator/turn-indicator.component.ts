import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {PlayerData} from "../../services/models/player-data";

@Component({
  selector: 'app-turn-indicator',
  templateUrl: './turn-indicator.component.html',
  styleUrls: ['./turn-indicator.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TurnIndicatorComponent implements OnInit {
  @Input() timeRemaining: number = 0
  @Input() currentPlayer: PlayerData | undefined
  @Input() isMyTurn: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
