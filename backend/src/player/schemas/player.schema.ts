import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type PlayerDocument = Player & Document

@Schema()
export class Player {
   @Prop()
   _id: string
   @Prop()
   username: string
   @Prop()
   socketId: string
}

export const PlayerSchema = SchemaFactory.createForClass(Player);