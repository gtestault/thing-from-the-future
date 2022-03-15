import { Component, OnInit } from '@angular/core';
import { FutureThingsService } from '../../services/future-things.service';
import {GameService} from "../../services/game.service";
import {Subscription} from "rxjs";
import {GameState} from "../../services/models/game-state";
import {VOTING_PATH} from "../../routes";
import {UserIdea} from "../../../models/UserIdea";

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss']
})
export class VotingComponent implements OnInit {

  futureThings: UserIdea[] = [];
  gameUpdatesSubscription: Subscription | null = null;
  timeRemaining: number = 0;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.init()
    this.gameUpdatesSubscription = this.gameService.getGameUpdates().subscribe(update => {
      this.futureThings = update.players.map(p => ({username: p.username, idea: p.futureThing}))
      this.timeRemaining = update.timeRemaining
    });
  }

  ngOnDestroy(): void {
    this.gameUpdatesSubscription?.unsubscribe()
  }
}
