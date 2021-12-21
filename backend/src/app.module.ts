import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {WaitingRoomModule} from './waiting-room/waiting-room.module';
import {MongooseModule} from '@nestjs/mongoose';
import { PlayerModule } from './player/player.module';
import {PlayerController} from "./player/player.controller";


@Module({
    imports: [
        MongooseModule.forRoot('mongodb://root:secret@localhost', {dbName: "nest"}),
        WaitingRoomModule,
        PlayerModule,
    ],
    controllers: [AppController, PlayerController],
    providers: [AppService],
})
export class AppModule {
}
