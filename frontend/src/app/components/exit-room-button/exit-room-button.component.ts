import { Component, OnInit } from '@angular/core';
import {GameService} from "../../services/game.service";
import {showErrorSnackbar, showSuccessSnackbar} from "../../utils/snackbar";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {ROOM_SELECTION_PATH} from "../../routes";

@Component({
  selector: 'app-exit-room-button',
  templateUrl: './exit-room-button.component.html',
  styleUrls: ['./exit-room-button.component.scss']
})
export class ExitRoomButtonComponent implements OnInit {

  constructor(private gameService: GameService, private snackbar: MatSnackBar, private router: Router) { }

  async onLeave() {
    try {
      await this.gameService.leaveRoom()
      showSuccessSnackbar(this.snackbar, "left game room")
      this.router.navigate([ROOM_SELECTION_PATH])
    } catch (e) {
      showErrorSnackbar(this.snackbar, "failed to leave game room");
    }

  }
  ngOnInit(): void {
  }

}
