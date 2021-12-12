export class Player {
    constructor(id: string, username: string) {
        this._id = id;
        this._username = username;
    }

    private _id: string
    private _username: string

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }
    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }
}
