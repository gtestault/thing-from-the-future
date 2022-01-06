import {Module} from '@nestjs/common';
import {PlayerService} from "./player.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Player, PlayerSchema} from "./schemas/player.schema";

@Module({
    providers: [PlayerService],
    imports: [
        MongooseModule.forFeature([{name: Player.name, schema: PlayerSchema}]),
    ],
    exports: [
        PlayerService,
    ]
})
export class PlayerModule {
}
