import { Injectable } from '@angular/core';
import { Player} from '../models/Player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private players: Player[] = [
    {
      name: 'player1',
      id: 1
    },
    {
      name: 'susi123',
      id: 2
    },
    {
      name: 'hello_x',
      id: 3
    },
    {
      name: 'lena92',
      id: 4
    }

  ]

  constructor() { }

  //TODO: Set player array, remove dummy data

  getPlayers(): Player[] {
    return this.players;
  }
}
