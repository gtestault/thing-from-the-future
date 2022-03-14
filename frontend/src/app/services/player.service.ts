import { Injectable } from '@angular/core';
import { Player} from '../../models/Player';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from "../../environments/environment";
import {NewPlayerDTO} from "./dto/new-player";

const STORAGE_PLAYER_ID_KEY = "player_id"
const STORAGE_USERNAME_KEY = "username"

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

  myID = 0;


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


    //TODO: change current player when card was played
  username: string | null = null
  playerId: string | null = null

  constructor(private http: HttpClient) {
    this.playerId = localStorage.getItem(STORAGE_PLAYER_ID_KEY)
    this.username = localStorage.getItem(STORAGE_USERNAME_KEY)
  }

  logoutPlayer() {
    this.playerId = ""
    this.username = ""
    localStorage.setItem(STORAGE_PLAYER_ID_KEY, "")
    localStorage.setItem(STORAGE_USERNAME_KEY, "")
  }

  isRegistered(): boolean {
    return !!this.username && !!this.playerId
  }

  async registerPlayer(username: string) {
    let newPlayer: NewPlayerDTO = {username: username}
    this.playerId = await this.http.post<string>(environment.playerApiURL, newPlayer)
      .pipe(catchError(PlayerService.handleError))
      .toPromise()
    this.username = username
    localStorage.setItem(STORAGE_PLAYER_ID_KEY, this.playerId)
    localStorage.setItem(STORAGE_USERNAME_KEY, this.username)
  }

  getUsername(): string | null  {
    return this.username
  }
  getPlayerId(): string | null  {
    return this.playerId
  }

  private static handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
