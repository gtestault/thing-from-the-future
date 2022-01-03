import { Component, OnInit } from '@angular/core';
import { Player } from '../../models/Player';

@Component({
  selector: 'app-player-overview',
  templateUrl: './player-overview.component.html',
  styleUrls: ['./player-overview.component.scss']
})
export class PlayerOverviewComponent implements OnInit {

  players: Player[] = [];

  constructor() { }

  ngOnInit(): void {
    //TODO: get players
    this.players = [
      {
        name: 'player1',
        id: 1
      },
      {
        name: 'susi123',
        id: 2
      },
      {
        name: 'hello_x',
        id: 3
      },
      {
        name: 'lena92',
        id: 4
      }

        ]

  }

}
