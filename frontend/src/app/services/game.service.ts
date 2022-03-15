import {Injectable} from '@angular/core';
import {io, Socket} from 'socket.io-client';
import {PlayerService} from './player.service';
import {JoinRoomDto} from './dto/join-room-dto';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {GameTick} from './models/game-tick';
import {Router} from "@angular/router";
import {PlayCardDto} from "./dto/play-card-dto";

const NEW_ROOM_ACTION = 'new-room';
const JOIN_ROOM_ACTION = 'join-room';
const LEAVE_ROOM_ACTION = 'leave-room'
const START_GAME_ACTION = 'start-game';
const SWAP_CARDS_ACTION = 'swap-cards';
const SUBMIT_STORY_ACTION = 'submit-story'
const PLAY_CARD_ACTION = 'play-card';

const UPDATE_EVENT = 'update';
const LOGOUT_PLAYER_EVENT = 'logout-player';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private playerService: PlayerService,
    private router: Router,
  ) {
  }

  private socket: Socket | null = null;
  private roomId = '';
  private gameUpdates = new Observable<GameTick>();

  static isException(res: any): boolean {
    return res.hasOwnProperty('error');
  }

  init(): void {
    this.getSocket();
  }

  getSocket(): Socket {
    const playerId = this.playerService.getPlayerId() as string;
    if (!this.socket) {
      this.socket = io(environment.socketIoUrl, {extraHeaders: {Authorization: playerId}});
      this.gameUpdates = new Observable<GameTick>(
        observer => {
          this.getSocket().on(UPDATE_EVENT, (data: any) => {
            observer.next(JSON.parse(data) as GameTick);
          });
        }
      );
      this.getSocket().on(LOGOUT_PLAYER_EVENT, (data: any) => {
        console.log("logged player out")
        this.playerService.logoutPlayer()
        this.router.navigateByUrl("/")
      });
      console.log("initialized socket")
    }
    return this.socket;
  }


  subscribeToGameUpdates(): Observable<GameTick> {
    return this.gameUpdates;
  }

  getGameUpdates(): Observable<GameTick> {
    return this.gameUpdates;
  }

  createRoom(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.getSocket().emit(NEW_ROOM_ACTION, JSON.stringify({}), (res: any) => {
          if (GameService.isException(res)) {
            reject(new Error(res.message));
          }
          const roomId = (res as string);
          this.roomId = roomId;
          resolve(roomId);
        }
      );
    });
  }

  leaveRoom(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.getSocket().emit(LEAVE_ROOM_ACTION, JSON.stringify({}), (res: any) => {
          if (GameService.isException(res)) {
            reject(new Error(res.message));
          }
          resolve();
        }
      );
    });
  }

  joinRoom(roomId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const joinRoomRequest: JoinRoomDto = {roomId};
      this.getSocket().emit(JOIN_ROOM_ACTION, joinRoomRequest, (res: any) => {
          if (GameService.isException(res)) {
            reject(new Error(res.message));
          }
          this.roomId = roomId;
          resolve();
        }
      );
    });
  }

  playCard(kind: string, name: string): Promise<void> {
    return new Promise((resolve, reject) => {
      let playCardDto: PlayCardDto = {card: {kind: kind, name: name}}
      this.getSocket().emit(PLAY_CARD_ACTION, playCardDto, (res: any) => {
          if (GameService.isException(res)) {
            reject(new Error(res.message));
          }
          resolve();
        }
      );
    });
  }

  swapCards(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.getSocket().emit(SWAP_CARDS_ACTION, {}, (res: any) => {
          if (GameService.isException(res)) {
            reject(new Error(res.message));
          }
          resolve();
        }
      );
    });
  }

  submitStory(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.getSocket().emit(SUBMIT_STORY_ACTION, {text}, (res: any) => {
          if (GameService.isException(res)) {
            reject(new Error(res.message));
          }
          resolve();
        }
      );
    });
  }

  startGame(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.getSocket().emit(START_GAME_ACTION, JSON.stringify({}), (res: any) => {
          if (GameService.isException(res)) {
            reject(new Error(res.message));
          }
          resolve();
        }
      );
    });
  }
}
