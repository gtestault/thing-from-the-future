import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import {Player} from "../../player/schemas/player.schema";
import {Document} from "mongoose";

export type RoomDocument = Room & Document

@Schema()
export class Room {
    @Prop()
    _id: string
    @Prop({ type: mongoose.Schema.Types.String, ref: 'Player' })
    admin: Player
    @Prop({ type: [{ type: mongoose.Schema.Types.String, ref: 'Player' }] })
    players: Player[]
}

export const RoomSchema = SchemaFactory.createForClass(Room)