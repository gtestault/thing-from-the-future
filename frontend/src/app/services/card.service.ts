import { Injectable } from '@angular/core';
import { Card } from '../../models/Card';
import {BehaviorSubject} from 'rxjs';
import {GameService} from "./game.service";

@Injectable({
  providedIn: 'root'
})
export class CardService {
  //index 0 - 3: arc, terrain, object, mood
  playedCards = new BehaviorSubject<Card[]>([
    {kind: '',
      name: '',
      time: ''},
    {kind: '',
      name: '',
      time: ''},
    {kind: '',
      name: '',
      time: ''},
    {kind: '',
      name: '',
      time: ''}]);

  constructor(gameService: GameService) { }
}
