import { Module } from '@nestjs/common';
import {WaitingRoomGateway} from "./waiting-room.gateway";
import {RoomService} from "./room.service";
import {PlayerService} from "./player.service";

@Module({
    providers: [WaitingRoomGateway, RoomService, PlayerService]
})
export class WaitingRoomModule {

}
