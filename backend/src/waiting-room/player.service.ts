import {Injectable, Logger} from "@nestjs/common";
import {Player} from "./models/player";


export interface IndexedPlayersStore {
    [key: string]: Player
}
@Injectable()
export class PlayerService {
    private playersById:  IndexedPlayersStore = {}
    private readonly logger = new Logger(PlayerService.name);

    newPlayer(player: Player) {
        this.playersById[player.id] = player
    }

    removePlayer(id: string) {
        this.playersById[id] = undefined
    }

    getPlayerById(id: string): Player | undefined {
        return this.playersById[id]
    }
}
