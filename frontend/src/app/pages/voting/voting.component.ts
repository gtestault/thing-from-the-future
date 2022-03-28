import {Component, OnDestroy, OnInit} from '@angular/core';
import {FutureThingsService} from '../../services/future-things.service';
import {GameService} from "../../services/game.service";
import {Subscription} from "rxjs";
import {GameState} from "../../services/models/game-state";
import {VOTING_PATH, WINNER_ANNOUNCEMENT_PATH} from "../../routes";
import {UserIdea} from "../../../models/UserIdea";
import {Router} from "@angular/router";
import {showErrorSnackbar, showSuccessSnackbar} from "../../utils/snackbar";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss']
})
export class VotingComponent implements OnInit, OnDestroy {

  futureThings: UserIdea[] = [];
  gameUpdatesSubscription: Subscription | null = null;
  timeRemaining: number = 0;
  canVote = true;

  constructor(
    private gameService: GameService,
    private router: Router,
    private snackbar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.gameService.init()
    this.gameUpdatesSubscription = this.gameService.getGameUpdates().subscribe(update => {
      if (update.gameState == GameState.WINNER_ANNOUNCEMENT) {
        this.router.navigate([WINNER_ANNOUNCEMENT_PATH])
      }
      this.futureThings = update.players.map(p => ({username: p.username, idea: p.futureThing}))
      this.timeRemaining = update.timeRemaining
    });
  }

  async voteSent(author: string): Promise<void> {
    try {
      await this.gameService.submitVote(author);
      showSuccessSnackbar(this.snackbar, `you voted for ${author}'s idea!`);
    } catch (e) {
      showErrorSnackbar(this.snackbar, `Failed to vote: ${e.toString()}`);
    }
    this.canVote = false;
  }

  ngOnDestroy(): void {
    this.gameUpdatesSubscription?.unsubscribe();
  }
}
