import {Injectable, Logger} from '@nestjs/common';
import {Player} from "./models/player";
import * as xkcd from "xkcd-password"
import {Room} from "./models/room";

export interface RoomStore {
    [key: string]: Room
}

@Injectable()
export class RoomService {
    private readonly logger = new Logger(RoomService.name);
    private rooms: RoomStore = {}

    /**
     * Creates a room for a thing-for-the-future game
     * @param player will be the host of the room, and can change the room settings (e.g. time limit for brainstorming)
     *
     * returns the id of the created room
     */
    async createRoom(player: Player) {
        const passphrase = await (new xkcd()).generate();
        const roomId = passphrase.join('-')
        this.rooms[roomId] = new Room(roomId, player)
        this.logger.log(`created new room with id: ${roomId}`)
        return roomId
    }
    async joinRoom(player: Player, roomId: string) {
        const room = this.rooms[roomId]
        room.addPlayer(player)
        this.logger.log(`player '${player.username}' joined room: '${room.id}'`)
    }
}
