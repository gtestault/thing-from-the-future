import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import {Player} from "../../player/schemas/player.schema";
import {Document} from "mongoose";
import {Card, Deck} from "thing-from-the-future-utils";

export type RoomDocument = Room & Document

export enum GameState {
    WAITING_ROOM = "WAITING_ROOM",
    PLAYING_PLAYFIELD = "PLAYING_PLAYFIELD",
    PLAYING_BRAINSTORM = "PLAYING_BRAINSTORM",
    PLAYING_IDEA_SELECTION = "PLAYING_IDEA_SELECTION",
    WINNER_ANNOUNCEMENT = "WINNER_ANNOUNCEMENT",
}

export type PlayerCards = {
    [username: string]: Card[]
}

export type PlayerStories = {
    [username: string]: string
}

export type PlayerPoints = {
    [username: string]: number
}
@Schema({minimize: false, versionKey: false})
export class Room {
    @Prop()
    _id: string
    @Prop({ type: mongoose.Schema.Types.String, ref: 'Player' })
    admin: Player
    @Prop({ type: [{ type: mongoose.Schema.Types.String, ref: 'Player' }] })
    players: Player[]
    @Prop({type: String, default: GameState.WAITING_ROOM})
    gameState: GameState
    @Prop({ type: mongoose.Schema.Types.String, ref: 'Player' })
    currentPlayer: Player
    @Prop({ type: mongoose.Schema.Types.String, ref: 'Player' })
    winner: Player
    @Prop({ type: [{ type: mongoose.Schema.Types.String, ref: 'Player' }] })
    playerQueue: Player[]
    @Prop({type: mongoose.Schema.Types.Number, default: 0})
    timeRemaining: number
    @Prop({type: mongoose.Schema.Types.Mixed})
    playerCards: PlayerCards
    @Prop({type: mongoose.Schema.Types.Mixed})
    playerStories: PlayerStories
    @Prop({type: mongoose.Schema.Types.Mixed})
    playerPoints: PlayerPoints
    @Prop({type: mongoose.Schema.Types.Mixed, default: []})
    playedCards: Card[]
    @Prop({type: mongoose.Schema.Types.Mixed})
    deck: Deck
}

export const RoomSchema = SchemaFactory.createForClass(Room)
