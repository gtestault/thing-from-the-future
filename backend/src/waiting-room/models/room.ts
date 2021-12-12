import {Player} from "./player";

export class Room {
    private _id: string
    private _admin: Player
    private _players: Player[]

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get admin(): Player {
        return this._admin;
    }

    set admin(value: Player) {
        this._admin = value;
    }

    get players(): Player[] {
        return this._players;
    }

    set players(value: Player[]) {
        this._players = value;
    }

    constructor(id: string, admin: Player) {
        this._id = id
        this._admin = admin
    }

    addPlayer(player: Player) {
        this._players = [...this.players, player]
    }

    removePlayer(playerToRemove: Player) {
        this.players = [...this.players.filter(p => p.id != playerToRemove.id)]
    }

}
