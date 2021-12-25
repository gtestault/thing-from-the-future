import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface JoinRoomDialogData {
  roomId: string
}
@Component({
  selector: 'app-join-room-dialog',
  templateUrl: './join-room-dialog.component.html',
  styleUrls: ['./join-room-dialog.component.scss']
})
export class JoinRoomDialogComponent implements OnInit {

  ngOnInit(): void {
  }
  constructor(
    public dialogRef: MatDialogRef<JoinRoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: JoinRoomDialogData,
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
