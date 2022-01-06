import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {PlayerService} from "../../player/player.service";

export function getPlayerIdFromExecutionContext(context: ExecutionContext): string | undefined {
    return context.switchToWs().getClient().handshake.headers.authorization
}

@Injectable()
export class WsGuard implements  CanActivate {
    constructor(private playerService: PlayerService) {
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const playerId = getPlayerIdFromExecutionContext(context)
        if (!playerId) {
            return false
        }
        const player = await this.playerService.getPlayerById(playerId)
        if (!player) {
            return false
        }

        const request = context.switchToHttp().getRequest()
        request.player = player
        return true;
    }

}