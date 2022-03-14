import { Injectable } from '@angular/core';
import { Card } from '../../models/Card';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  //index 0 - 3: arc, terrain, object, mood
  playedCards = new BehaviorSubject<Card[]>([
    {category: 'arc',
      term: 'jkdebf',
      time: 'sdkjbf'},
    {category: 'terrain',
      term: 'jksdnfuie',
      time: ''},
    {category: 'object',
      term: 'jfuiew',
      time: ''},
    {category: 'mood',
      term: 'kjdbcdf',
      time: ''}]);

  constructor() { }
}
