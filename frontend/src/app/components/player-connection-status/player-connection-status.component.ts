import { Component, OnInit } from '@angular/core';
import {PlayerService} from "../../services/player.service";

@Component({
  selector: 'app-player-connection-status',
  templateUrl: './player-connection-status.component.html',
  styleUrls: ['./player-connection-status.component.scss']
})
export class PlayerConnectionStatusComponent implements OnInit {
  playerUsername: string | null = null
  constructor(private _playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerUsername = this._playerService.getUsername()
  }

}
