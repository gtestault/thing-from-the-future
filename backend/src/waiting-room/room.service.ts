import {Injectable, Logger} from '@nestjs/common';
import * as xkcd from "xkcd-password"
import {Player} from "../player/schemas/player.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Room, RoomDocument} from "./schemas/room.schema";

@Injectable()
export class RoomService {
    private readonly logger = new Logger(RoomService.name);
    constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) { }

    /**
     * Creates a room for a thing-for-the-future game
     * @param player will be the host of the room, and can change the room settings (e.g. time limit for brainstorming)
     *
     * returns the id of the created room
     */
    async createRoom(player: Player): Promise<string> {
        const passphrase = await (new xkcd()).generate();
        const roomId = passphrase.join('-')
        const room = new this.roomModel({_id: roomId, admin: player})
        this.logger.log(`created new room with id: ${roomId} with admin ${player.username}`)
        return roomId
    }
    async joinRoom(player: Player, roomId: string) {
        let room = await this.roomModel.findById(roomId).exec()
        room.players = [...room.players, player]
        await room.save()
    }
}
