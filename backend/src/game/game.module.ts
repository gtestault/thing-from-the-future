import { Module } from '@nestjs/common';
import {GameGateway} from "./game.gateway";
import {RoomService} from "./room.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Room, RoomSchema} from "./schemas/room.schema";
import {AuthenticationModule} from "../authentication/authentication.module";

@Module({
    providers: [GameGateway, RoomService],
    imports: [
        AuthenticationModule,
        MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }])
    ],
    exports: [GameGateway]
})
export class GameModule {

}
