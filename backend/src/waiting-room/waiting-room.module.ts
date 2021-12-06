import { Module } from '@nestjs/common';
import {WaitingRoomGateway} from "./waiting-room.gateway";

@Module({
    providers: [WaitingRoomGateway]
})
export class WaitingRoomModule {

}
