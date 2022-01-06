import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameService} from "../../services/game.service";
import {Player} from "../../services/models/player";
import {PlayerService} from "../../services/player.service";
import {InvitePlayersDialogComponent} from "../../components/invite-players-dialog/invite-players-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {WAITING_ROOM_PATH_ROOM_ID_VARIABLE} from "../../routes";

//TODO: make it possible to leave a room.
@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.scss']
})
export class WaitingRoomComponent implements OnInit, OnDestroy {
  ownUsername: string = ""
  players: Player[] = []
  roomId: string = ""
  gameUpdatesSubscription: Subscription | null = null

  constructor(
    private gameService: GameService,
    private playerService: PlayerService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) { }

  ngOnDestroy() {
    if (this.gameUpdatesSubscription) {
      this.gameUpdatesSubscription.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
       const roomId = params[WAITING_ROOM_PATH_ROOM_ID_VARIABLE];
       if (roomId) {
         this.gameService.joinRoom(roomId)
       }
    });
    this.ownUsername = this.playerService.getUsername() || ""
    this.gameService.init()
    this.gameUpdatesSubscription = this.gameService.getGameUpdates().subscribe(update => {
      this.players = update.players
      this.roomId = update.roomId
    })
  }

  onInvitePlayers() {
    this.openInvitePlayersDialog()
  }

  openInvitePlayersDialog(): void {
    this.dialog.open(InvitePlayersDialogComponent, {
      width: '30rem',
      data: {roomId: this.roomId}
    });
  }
}