import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {PlayerService} from "../../player/player.service";

@Injectable()
export class WsGuard implements  CanActivate {
    constructor(private playerService: PlayerService) {
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const playerId = context.switchToWs().getClient().handshake.headers.authorization
        if (!playerId) {
            return false
        }
        const player = await this.playerService.getPlayerById(playerId)
        if (!player) {
            return false
        }
        return true;
    }

}