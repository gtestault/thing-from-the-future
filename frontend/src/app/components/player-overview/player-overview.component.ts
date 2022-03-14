import {Component, Input, OnInit} from '@angular/core';
import { PlayerService } from '../../services/player.service';
import {PlayerData} from "../../services/models/player-data";

@Component({
  selector: 'app-player-overview',
  templateUrl: './player-overview.component.html',
  styleUrls: ['./player-overview.component.scss']
})
export class PlayerOverviewComponent implements OnInit {

  @Input() players: PlayerData[] = []

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {

  }

  isMe(username: string) {
    return this.playerService.getUsername() == username
  }

}
