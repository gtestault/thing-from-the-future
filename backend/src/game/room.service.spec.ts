import {INestApplication} from "@nestjs/common";
import {Test} from "@nestjs/testing";
import {RoomService} from "./room.service";
import {PlayerService} from "../player/player.service";
import {MongoMemoryServer} from "mongodb-memory-server";
import * as MockedSocket from "socket.io-mock"
import {MongooseModule} from "@nestjs/mongoose";
import {GameState, Room, RoomSchema} from "./schemas/room.schema";
import {Player, PlayerSchema} from "../player/schemas/player.schema";
import {Socket} from "socket.io";

async function createNestApp(...gateways): Promise<INestApplication> {
    const testingModule = await Test.createTestingModule({
        providers: gateways,
    }).compile();
    return testingModule.createNestApplication();
}

describe('RoomService', () => {
    let playerService: PlayerService
    let roomService: RoomService
    let testPlayer1: Player
    let testPlayer1socket: Socket
    let testPlayer2: Player
    let testPlayer2socket: Socket
    let testPlayer3: Player
    let testPlayer4: Player
    let mongod: MongoMemoryServer
    beforeEach(async () => {
        mongod = await MongoMemoryServer.create();
        let module = await Test.createTestingModule({
            imports: [
                MongooseModule.forRootAsync({
                    useFactory: async () => ({
                        uri: mongod.getUri(),
                    }),
                }),
                MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
                MongooseModule.forFeature([{name: Player.name, schema: PlayerSchema}]),
            ],
            providers: [PlayerService, RoomService]
        }).compile();
        playerService = module.get<PlayerService>(PlayerService);
        roomService =  module.get<RoomService>(RoomService);

        testPlayer1 = await playerService.getPlayerById(await playerService.newPlayer("test1"))
        testPlayer1socket = new MockedSocket()
        testPlayer2socket = new MockedSocket()
        testPlayer2 = await playerService.getPlayerById(await playerService.newPlayer("test2"))
        testPlayer3 = await playerService.getPlayerById(await playerService.newPlayer("test3"))
        testPlayer4 = await playerService.getPlayerById(await playerService.newPlayer("test4"))
    });
    afterEach(async () => {
        await playerService.removePlayer(testPlayer1._id)
        await playerService.removePlayer(testPlayer2._id)
        await playerService.removePlayer(testPlayer3._id)
        await playerService.removePlayer(testPlayer4._id)
        await mongod.stop()
    })
    it("should be able to create a game room", async () => {
        let roomId = await roomService.createRoom(testPlayer1)
        await roomService.joinRoom(roomId, testPlayer1, testPlayer1socket)
        let room = await roomService.getRoom(roomId)
        expect(room._id).toEqual(roomId)
        expect(room.admin._id).toEqual(testPlayer1._id)
        expect(room.admin.username).toEqual(testPlayer1.username)
        expect(room.players[0]._id).toEqual(testPlayer1._id)
        expect(room.gameState).toEqual(GameState.WAITING_ROOM)
        await roomService.deleteRoom(roomId)
    })
    it("should be able to start a game", async () => {
        let roomId = await roomService.createRoom(testPlayer1)
        await roomService.joinRoom(roomId, testPlayer1, testPlayer1socket)
        await roomService.joinRoom(roomId, testPlayer2, testPlayer2socket)
        await roomService.startGame(roomId)
        const room = await roomService.getRoom(roomId)
        expect(room.gameState).toEqual(GameState.PLAYING_PLAYFIELD)
        expect(room.playerCards["test1"].length).toEqual(7)
        expect(room.playerCards["test2"].length).toEqual(7)
        expect(room.playedCards.length).toEqual(0)
        expect(room.currentPlayer.username).toEqual(testPlayer1.username)
        expect(room.players.map(p => p.username)).toEqual(["test1", "test2"])
        expect(room.playerQueue.map(p => p.username)).toEqual(["test2"])
    })
    it("should be skip a player if he doesn't play", async () => {
        let roomId = await roomService.createRoom(testPlayer1)
        await roomService.joinRoom(roomId, testPlayer1, testPlayer1socket)
        await roomService.joinRoom(roomId, testPlayer2, testPlayer2socket)
        await roomService.startGame(roomId)
        for (let i = 0; i <= RoomService.PLAYER_TURN_TIME_SECONDS; i++)  {
            await roomService.decreaseTime(roomId)
        }
        let room = await roomService.getRoom(roomId)
        expect(room.currentPlayer.username).toEqual(testPlayer2.username)
        expect(room.players.map(p => p.username)).toEqual(["test1", "test2"])
        expect(room.playerQueue.map(p => p.username)).toEqual([])
    })
})
