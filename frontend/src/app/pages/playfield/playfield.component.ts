import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {PlayerService} from '../../services/player.service';
import {GameService} from '../../services/game.service';
import {PlayerData} from "../../services/models/player-data";

@Component({
  selector: 'app-playfield',
  templateUrl: './playfield.component.html',
  styleUrls: ['./playfield.component.scss']
})
export class PlayfieldComponent implements OnInit {
  gameUpdatesSubscription: Subscription | null = null;
  ownUsername = '';
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
    });
  }

}
