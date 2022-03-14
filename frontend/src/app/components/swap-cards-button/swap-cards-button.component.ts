import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GameService} from "../../services/game.service";
import {showErrorSnackbar} from "../../utils/snackbar";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-swap-cards-button',
  templateUrl: './swap-cards-button.component.html',
  styleUrls: ['./swap-cards-button.component.scss']
})
export class SwapCardsButtonComponent implements OnInit {
  @Input() isMyTurn: boolean = false

  constructor(
    private gameService: GameService,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
  }

  async onSwapCards() {
    try {
      await this.gameService.swapCards()
    } catch (e: any) {
      showErrorSnackbar(this.snackBar, e.message);
    }
  }
}
