import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {GameService} from "../../services/game.service";
import {showErrorSnackbar, showSuccessSnackbar} from "../../utils/snackbar";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-voting-card',
  templateUrl: './voting-card.component.html',
  styleUrls: ['./voting-card.component.scss']
})
export class VotingCardComponent implements OnInit {

  @HostBinding('style.voted')
  border = '2px solid $tftf-green';

  @Input() text = '';
  @Input() author = '';

  voted = false;

  constructor(
    private gameService: GameService,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.gameService.init()
  }

  async vote() {
    try {
      await this.gameService.submitVote(this.author)
      showSuccessSnackbar(this.snackbar, `you voted for ${this.author}'s idea!`)
    } catch (e) {
      showErrorSnackbar(this.snackbar, `Failed to vote: ${e.toString()}`)
    }
  }

}
