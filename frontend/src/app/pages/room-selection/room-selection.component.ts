import {Component, OnInit} from '@angular/core';
import {GameService} from '../../services/game.service';
import {MatDialog} from '@angular/material/dialog';
import {JoinRoomDialogComponent} from '../../components/join-room-dialog/join-room-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {showErrorSnackbar} from '../../utils/snackbar';
import {WAITING_ROOM_PATH} from '../../routes';
import {Router} from '@angular/router';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './room-selection.component.html',
  styleUrls: ['./room-selection.component.scss']
})
export class RoomSelectionComponent implements OnInit {
  roomId = '';

  constructor(
    public dialog: MatDialog,
    private gameService: GameService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  async onCreateRoom(): Promise<void> {
    try {
      this.roomId = await this.gameService.createRoom();
      await this.router.navigate([WAITING_ROOM_PATH]);
    } catch (e: any) {
      showErrorSnackbar(this.snackBar, e.message);
    }
  }

  onJoinRoom(): void {
    this.openJoinRoomDialog();
  }

  openJoinRoomDialog(): void {
    const dialogRef = this.dialog.open(JoinRoomDialogComponent, {
      width: '30rem',
      data: {roomId: this.roomId}
    });

    dialogRef.afterClosed().subscribe(roomId => {
      if (roomId) {
        this.joinRoom(roomId);
      }
    });
  }

  // TODO: if the username pastes join link in input dialog it should work too.
  //      requires extracting room id from join URL.
  async joinRoom(roomId: string): Promise<void> {
    try {
      await this.gameService.joinRoom(roomId);
      this.router.navigate([WAITING_ROOM_PATH]);
    } catch (e: any) {
      showErrorSnackbar(this.snackBar, e.message);
    }
  }
}
