import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {environment} from "../../../environments/environment";
import {WAITING_ROOM_PATH} from "../../routes";

export interface InvitePlayersDialogData {
  roomId: string
}
@Component({
  selector: 'app-invite-players-dialog',
  templateUrl: './invite-players-dialog.component.html',
  styleUrls: ['./invite-players-dialog.component.scss']
})
export class InvitePlayersDialogComponent implements OnInit {
  roomLink: string
  constructor(
    public dialogRef: MatDialogRef<InvitePlayersDialogData>,
    @Inject(MAT_DIALOG_DATA) public data: InvitePlayersDialogData,
  ) {
    this.roomLink = `${environment.frontendRoot}/${WAITING_ROOM_PATH}/${data.roomId}`
  }

  ngOnInit(): void {
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
