import {Body, Controller, Logger, Post, UsePipes, ValidationPipe} from "@nestjs/common";
import {PlayerService} from "./player.service";
import {NewPlayerDTO} from "./dto/new-player";

@UsePipes(new ValidationPipe({}))
@Controller('player')
export class PlayerController {
    private readonly logger = new Logger(PlayerController.name);
    constructor(private playerService: PlayerService) {
    }
    @Post()
    async newPlayer(@Body() newPlayerDTO: NewPlayerDTO): Promise<string> {
        const id = await this.playerService.newPlayer(newPlayerDTO.username)
        this.logger.log(`created new player '${newPlayerDTO.username}' with id '${id}'`)
        return id
    }
}