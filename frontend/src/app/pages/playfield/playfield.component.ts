import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {PlayerService} from '../../services/player.service';
import {GameService} from '../../services/game.service';
import {PlayerData} from "../../services/models/player-data";
import * as _ from "lodash";

@Component({
  selector: 'app-playfield',
  templateUrl: './playfield.component.html',
  styleUrls: ['./playfield.component.scss']
})
export class PlayfieldComponent implements OnInit {
  gameUpdatesSubscription: Subscription | null = null;
  ownUsername = '';
  currentPlayer: PlayerData | undefined;
  timeRemaining: number = 0
  isMyTurn: boolean = false;
  players: PlayerData[] = []
  roomId = '';
  constructor(
    private gameService: GameService,
    private playerService: PlayerService,
  ) { }

  ngOnInit(): void {
    this.ownUsername = this.playerService.getUsername() || '';
    this.gameService.init();
    this.gameUpdatesSubscription = this.gameService.getGameUpdates().subscribe(update => {
      console.log(update)
      this.players = update.players
      this.timeRemaining = update.timeRemaining
      this.currentPlayer = _.find(this.players, p => p.isCurrentPlayer)
      this.isMyTurn = this.currentPlayer?.username === this.ownUsername
    });
  }

}
