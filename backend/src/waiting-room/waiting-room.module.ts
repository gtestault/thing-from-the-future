import { Module } from '@nestjs/common';
import {WaitingRoomGateway} from "./waiting-room.gateway";
import {RoomService} from "./room.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Room, RoomSchema} from "./schemas/room.schema";
import {AuthenticationModule} from "../authentication/authentication.module";

@Module({
    providers: [WaitingRoomGateway, RoomService],
    imports: [
        AuthenticationModule,
        MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }])
    ],
    exports: [WaitingRoomGateway]
})
export class WaitingRoomModule {

}
