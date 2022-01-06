import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {GameModule} from './game/game.module';
import {MongooseModule} from '@nestjs/mongoose';
import {PlayerModule} from './player/player.module';
import {PlayerController} from "./player/player.controller";
import {ScheduleModule} from "@nestjs/schedule";


@Module({
    imports: [
        MongooseModule.forRoot('mongodb://root:secret@localhost', {dbName: "nest"}),
        ScheduleModule.forRoot(),
        GameModule,
        PlayerModule,
    ],
    controllers: [AppController, PlayerController],
    providers: [AppService],
})
export class AppModule {
}
