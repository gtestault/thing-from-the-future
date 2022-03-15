import {Component, OnInit} from '@angular/core';
import {Card} from "thing-from-the-future-utils";
import {GameService} from "../../services/game.service";
import {Subscription} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {showErrorSnackbar, showSuccessSnackbar} from "../../utils/snackbar";

@Component({
  selector: 'app-brainstorm',
  templateUrl: './brainstorm.component.html',
  styleUrls: ['./brainstorm.component.scss']
})
export class BrainstormComponent implements OnInit {
  storySubmitted = false;
  playedCards: Card[] = [];
  gameUpdatesSubscription: Subscription | null = null;
  timeRemaining: number = 0

  constructor(
    private gameService: GameService,
    private snackbar: MatSnackBar
  ) { }


  ngOnInit(): void {
    this.gameService.init();
    this.gameUpdatesSubscription = this.gameService.getGameUpdates().subscribe(update => {
      this.playedCards = update.playedCards
      this.timeRemaining = update.timeRemaining
      console.log(update)
    });
  }

  ngOnDestroy(): void {

    this.gameUpdatesSubscription?.unsubscribe()
  }

  async submit(story: string) {
    this.storySubmitted = true;
    try {
      await this.gameService.submitStory(story)
      showSuccessSnackbar(this.snackbar, "Submitted your story. Please wait wait while others finish writing theirs.")
    } catch (e) {
      showErrorSnackbar(this.snackbar, `Couldn't submit story: ${e.toString()}`);
    }
  }

}
