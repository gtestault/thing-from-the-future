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
  myID: number = 0;

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    //TODO: get players
    this.players = this.playerService.players;
    this.myID = this.playerService.myID;
    this.playerService.currentPlayersID.subscribe(currentPlayersID => {
      this.currentPlayersID = currentPlayersID;
    })

  }

  isMe(id: number) {
    return id === this.myID;
  }

  isCurrentPlayer(id: number) {
    return id === this.currentPlayersID;
  }

}
