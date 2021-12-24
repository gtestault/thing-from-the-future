import {Injectable, Logger} from "@nestjs/common";
import {Player, PlayerDocument} from "./schemas/player.schema";
import {v4 as uuidv4} from 'uuid';
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";


@Injectable()
export class PlayerService {
    constructor(@InjectModel(Player.name) private playerModel: Model<PlayerDocument>) {}
    private readonly logger = new Logger(PlayerService.name);

    async newPlayer(username: string) {
        const _id: string = uuidv4().toString()
        const newPlayer = new this.playerModel({_id, username})
        await newPlayer.save()
        return _id
    }

    async joinRoom(playerId: string, roomId: string) {
        let player = await this.playerModel.findById(playerId).exec()
        player.roomId = roomId
        await player.save()
    }
    async leaveRoom(playerId: string) {
        let player = await this.playerModel.findById(playerId).exec()
        player.roomId = ""
        await player.save()
    }

    async removePlayer(id: string) {
        await this.playerModel.findByIdAndDelete(id).exec()
    }

    async getPlayerById(id: string): Promise<Player> {
        return await this.playerModel.findById(id).exec()
    }
}
