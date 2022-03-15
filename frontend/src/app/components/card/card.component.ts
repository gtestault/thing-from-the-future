import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {PlayerService} from '../../services/player.service';
import {Card, CardKind} from "thing-from-the-future-utils";
import {GameService} from "../../services/game.service";
import {Subscription} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {showErrorSnackbar} from "../../utils/snackbar";
import * as _ from "lodash";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() canPlay: boolean = false
  @Input() staticCard: boolean = false
  canPlayCategory: boolean = false
  constructor(
    private gameService: GameService,
    private playerService: PlayerService,
    private snackbar: MatSnackBar
  ) {
  }

  playedCards: Card[] = []
  @HostBinding('style.position')
  position = 'relative';

  @Input() kind = "";
  @Input() name = "";


  ngOnInit(): void {
  }

  async playCard(kind: string, name: string) {
    if (!this.canPlay) {
      showErrorSnackbar(this.snackbar, "This card cannot be played at the moment");
      return
    }
    try {
      await this.gameService.playCard(kind, name)
    } catch (e: any) {
      showErrorSnackbar(this.snackbar, `Couldn't play card: ${e.toString()}`);
    }
  }
}
