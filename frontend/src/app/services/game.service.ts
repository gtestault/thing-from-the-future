import {Injectable} from '@angular/core';
import {io, Socket} from 'socket.io-client';
import {PlayerService} from './player.service';
import {JoinRoomDto} from './dto/join-room-dto';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {GameTick} from './models/game-tick';

const NEW_ROOM_ACTION = 'new-room';
const JOIN_ROOM_ACTION = 'join-room';
const START_GAME_ACTION = 'start-game';

const UPDATE_EVENT = 'update';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private playerService: PlayerService) {
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
