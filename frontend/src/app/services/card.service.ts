import { Injectable } from '@angular/core';
import { Card } from '../../models/Card';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  //index 0 - 3: arc, terrain, object, mood
  playedCards = new BehaviorSubject<Card[]>([
    {category: '',
      term: '',
      time: ''},
    {category: '',
      term: '',
      time: ''},
    {category: '',
      term: '',
      time: ''},
    {category: '',
      term: '',
      time: ''}]);

  constructor() { }
}
