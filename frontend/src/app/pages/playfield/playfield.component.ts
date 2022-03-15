import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {PlayerService} from '../../services/player.service';
import {GameService} from '../../services/game.service';
import {PlayerData} from "../../services/models/player-data";
import * as _ from "lodash";
import {Card} from "thing-from-the-future-utils";
import {GameState} from "../../services/models/game-state";
import {Router} from "@angular/router";
import {BRAINSTORM_PATH, WAITING_ROOM_PATH} from "../../routes";

@Component({
  selector: 'app-playfield',
  templateUrl: './playfield.component.html',
  styleUrls: ['./playfield.component.scss']
})
export class PlayfieldComponent implements OnInit {
  gameUpdatesSubscription: Subscription | null = null;
  ownUsername = '';
  currentPlayer: PlayerData | undefined;
  playedCards: Card[] = []
  timeRemaining: number = 0
  isMyTurn: boolean = false;
  myCards: Card[] = []
  players: PlayerData[] = []
  roomId = '';

  constructor(
    private gameService: GameService,
    private playerService: PlayerService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.ownUsername = this.playerService.getUsername() || '';
    this.gameService.init();
    this.gameUpdatesSubscription = this.gameService.getGameUpdates().subscribe(update => {
      if (update.gameState === GameState.PLAYING_BRAINSTORM) {
        this.router.navigate([BRAINSTORM_PATH])
      }
      console.log(update)
      this.players = update.players
      this.playedCards = update.playedCards
      this.myCards = _.find(update.players, p => p.username === this.ownUsername)!.cards
      this.timeRemaining = update.timeRemaining
      this.currentPlayer = _.find(this.players, p => p.isCurrentPlayer)
      this.isMyTurn = this.currentPlayer?.username === this.ownUsername
    });
  }

  ngOnDestroy() {
    this.gameUpdatesSubscription?.unsubscribe()
  }

}
