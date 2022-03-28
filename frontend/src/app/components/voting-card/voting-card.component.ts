import {Component, HostBinding, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {GameService} from "../../services/game.service";
import {showErrorSnackbar, showSuccessSnackbar} from "../../utils/snackbar";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-voting-card',
  templateUrl: './voting-card.component.html',
  styleUrls: ['./voting-card.component.scss']
})
export class VotingCardComponent {

  @HostBinding('style.border')
  border = '5px solid #FFF7CA';

  @Input() text = '';
  @Input() author = '';
  @Input() canVote = true;
  @Output() voteSent = new EventEmitter<string>();

  constructor(
    private gameService: GameService,
    private snackbar: MatSnackBar,
  ) {
  }

  async vote() {
    this.border = '5px solid #36B722';
    this.voteSent.emit(this.author);
  }

}
