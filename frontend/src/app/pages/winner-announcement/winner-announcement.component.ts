import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {GameState} from "../../services/models/game-state";
import {WINNER_ANNOUNCEMENT_PATH} from "../../routes";
import {GameService} from "../../services/game.service";
import {Router} from "@angular/router";
import {UserIdea} from "../../../models/UserIdea";
import * as _ from "lodash";

@Component({
  selector: 'app-winner-announcement',
  templateUrl: './winner-announcement.component.html',
  styleUrls: ['./winner-announcement.component.scss']
})
export class WinnerAnnouncementComponent implements OnInit {

  gameUpdatesSubscription: Subscription | null = null;
  winningFutureThing: UserIdea = {idea: "", username: ""};
  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit(): void {
    this.gameService.init()
    this.gameUpdatesSubscription = this.gameService.getGameUpdates().subscribe(update => {
      for (let player of update.players) {
        if (player.username == update.winner.username) {
          this.winningFutureThing = {idea: player.futureThing, username: player.username}
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.gameUpdatesSubscription?.unsubscribe()
  }

}
