import {Injectable, Logger} from "@nestjs/common";
import {Player, PlayerDocument} from "./schemas/player.schema";
import {v4 as uuidv4} from 'uuid';
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";


@Injectable()
export class PlayerService {
    constructor(@InjectModel(Player.name) private playerModel: Model<PlayerDocument>) {}
    private readonly logger = new Logger(PlayerService.name);

    async newPlayer(username: string): Promise<string> {
        const _id = uuidv4()
        const newPlayer = new this.playerModel({_id, username})
        await newPlayer.save()
        return _id
    }

    async removePlayer(id: string) {
        await this.playerModel.findByIdAndDelete(id).exec()
    }

    async getPlayerById(id: string): Promise<Player> {
        return await this.playerModel.findById(id).exec()
    }
}
