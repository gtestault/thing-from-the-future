import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {GameModule} from './game/game.module';
import {MongooseModule} from '@nestjs/mongoose';
import {PlayerModule} from './player/player.module';
import {PlayerController} from "./player/player.controller";
import {ScheduleModule} from "@nestjs/schedule";
import { ConfigModule } from '@nestjs/config';


@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot('mongodb://root:secret@mongodb', {dbName: "nest"}),
        ScheduleModule.forRoot(),
        GameModule,
        PlayerModule,
    ],
    controllers: [PlayerController],
    providers: [AppService],
})
export class AppModule {
}
