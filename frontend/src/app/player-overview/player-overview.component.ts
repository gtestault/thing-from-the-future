import { Component, OnInit } from '@angular/core';
import { Player } from '../../models/Player';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-player-overview',
  templateUrl: './player-overview.component.html',
  styleUrls: ['./player-overview.component.scss']
})
export class PlayerOverviewComponent implements OnInit {

  players: Player[] = [];
  currentPlayersID: number = 0;

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    //TODO: get players
    this.players = this.playerService.getPlayers();
    this.playerService.currentPlayersID.subscribe(currentPlayersID => {
      this.currentPlayersID = currentPlayersID;
    })
  }

}
