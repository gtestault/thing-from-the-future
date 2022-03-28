import {Body, Controller, Logger, Post, Res, UsePipes, ValidationPipe} from "@nestjs/common";
import {PlayerService} from "./player.service";
import {NewPlayerDTO} from "./dto/new-player";
import {Response} from "express"

@UsePipes(new ValidationPipe({}))
@Controller('api/v1/player')
export class PlayerController {
    private readonly logger = new Logger(PlayerController.name);
    constructor(private playerService: PlayerService) {
    }
    @Post()
    async newPlayer(@Body() newPlayerDTO: NewPlayerDTO, @Res() res: Response) {
        const id = await this.playerService.newPlayer(newPlayerDTO.username)
        this.logger.log(`created new player '${newPlayerDTO.username}' with id '${id}'`)
        return res.json(id)
    }
}
