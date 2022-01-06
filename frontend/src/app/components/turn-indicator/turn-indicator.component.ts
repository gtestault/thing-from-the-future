import { Component, OnInit } from '@angular/core';
import {PlayerService} from '../services/player.service';

@Component({
  selector: 'app-turn-indicator',
  templateUrl: './turn-indicator.component.html',
  styleUrls: ['./turn-indicator.component.scss']
})
export class TurnIndicatorComponent implements OnInit {

  currentPlayer = '';

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.playerService.currentPlayersID.subscribe(id => {
      this.getCurrentPlayer(id);
    })
  }

  getCurrentPlayer(id: number) {
    if (id === this.playerService.myID) {
      this.currentPlayer = 'your';
    } else {
      this.currentPlayer = this.playerService.getPlayersName(id);
    }
  }



}
