import { Injectable } from '@angular/core';
import { Player} from '../../models/Player';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  players: Player[] = [
    {
      name: 'player1',
      id: 0
    },
    {
      name: 'susi123',
      id: 1
    },
    {
      name: 'hello_x',
      id: 2
    },
    {
      name: 'lena92',
      id: 3
    }
  ]

  currentPlayersID = new BehaviorSubject<number>(0);

  myID = 1;

  constructor() { }

  //TODO: Set player array, remove dummy data

  //TODO: set myID, remove dummy data

  getPlayersName(id: number) {
    let player;

   player = this.players.find(player => player.id === id);

   if (player) {
     return player.name;
   } else {
     return '';
   }
  }

  changeCurrentPlayer() {
    //TODO: change current player when card was played
  }
}
