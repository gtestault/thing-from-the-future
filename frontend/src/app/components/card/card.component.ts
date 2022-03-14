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

  constructor(
    private gameService: GameService,
    private playerService: PlayerService,
    private snackbar: MatSnackBar
  ) {
  }

  gameUpdatesSubscription: Subscription | null = null;
  playedCards: Card[] = []
  moodCardPlayed: boolean = false;
  arcCardPlayed: boolean = false;
  terrainCardPlayed: boolean = false;
  objectCardPlayed: boolean = false;
  @HostBinding('style.position')
  position = 'relative';

  @Input() kind = "";
  @Input() name = "";

  dragPosition = {x: 0, y: 0};

  ngOnInit(): void {
    this.gameService.init()
    this.gameUpdatesSubscription = this.gameService.getGameUpdates().subscribe(update => {
      this.moodCardPlayed = !!_.find(update.playedCards, c => c.kind == "mood")
      this.arcCardPlayed = !!_.find(update.playedCards, c => c.kind == "arc")
      this.objectCardPlayed = !!_.find(update.playedCards, c => c.kind == "object")
      this.terrainCardPlayed = !!_.find(update.playedCards, c => c.kind == "terrain")
    });
  }

  async playCard(kind: string, name: string) {
    const cardAlreadyPlayedError = "A card of this kind has been played already"
    switch (kind) {
      case "mood":
        if (this.moodCardPlayed) {
          showErrorSnackbar(this.snackbar, cardAlreadyPlayedError);
          return
        }
        break
      case "arc":
        if (this.arcCardPlayed) {
          showErrorSnackbar(this.snackbar, cardAlreadyPlayedError);
          return
        }
        break
      case "object":
        if (this.objectCardPlayed) {
          showErrorSnackbar(this.snackbar, cardAlreadyPlayedError);
          return
        }
        break
      case "terrain":
        if (this.terrainCardPlayed) {
          showErrorSnackbar(this.snackbar, cardAlreadyPlayedError);
          return
        }
        break
    }
    try {
      await this.gameService.playCard(kind, name)
    } catch (e: any) {
      //showErrorSnackbar(this.snackbar, `Couldn't play card: ${e.toString()}`);
    }
  }
}
