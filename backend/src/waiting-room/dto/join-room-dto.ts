import {IsAscii} from "class-validator";

export class JoinRoomDto {
    @IsAscii()
    roomId: string
}