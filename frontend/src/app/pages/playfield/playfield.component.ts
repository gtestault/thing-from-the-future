import { Component, OnInit } from '@angular/core';
import { Card} from '../../../models/Card';
import {Subscription} from 'rxjs';
import {Player} from '../../services/models/player';
import {PlayerService} from '../../services/player.service';
import {GameService} from '../../services/game.service';
import {PlayerCards} from '../../services/models/game-tick';

@Component({
  selector: 'app-playfield',
  templateUrl: './playfield.component.html',
  styleUrls: ['./playfield.component.scss']
})
export class PlayfieldComponent implements OnInit {
  gameUpdatesSubscription: Subscription | null = null;
  ownUsername = '';
  players: Player[] = [];
  playerCards: PlayerCards = {};
  roomId = '';
  constructor(
    private gameService: GameService,
    private playerService: PlayerService,
  ) { }

  ngOnInit(): void {
    this.ownUsername = this.playerService.getUsername() || '';
    this.gameService.init();
    this.gameUpdatesSubscription = this.gameService.getGameUpdates().subscribe(update => {
      this.players = update.players;
      this.roomId = update.roomId;
      this.playerCards = update.playerCards;
    });
  }

}
