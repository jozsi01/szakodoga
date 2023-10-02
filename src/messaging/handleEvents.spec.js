import { createTestingPinia } from "@pinia/testing";
import { gamePlayStoreFactory, boardStoreFactory } from 'src/messaging/storeFactory.js'
import { robotStep } from "src/robot/robotBehaviour";
import { handleStatusChange, handlePlayerChange, handlePositionChange, handleRollChange } from "./handleEvents.js";
import storeFactory from "./storeFactory";
import { useBoardStore } from "src/store/boardStore.js";
import gameplayStoreApi from "src/store/gameplayStoreApi.js";
import { useGamePlayStore } from "src/store/gameplayStore.js";
import { boards, changedPosBoard, changedPlayerBoard, boardWithFinishedStatus, createdBoard, resetedBoard} from "./testData.js"
jest.mock('src/robot/robotBehaviour', () => ({
    robotStep: jest.fn()
}));
jest.mock('src/messaging/storeFactory', () => ({
    gamePlayStoreFactory: jest.fn(),
    boardStoreFactory: jest.fn()
}));

jest.mock('src/vue-setup/router')




describe("Testing the handling of the server sent events", () => {


    let gamePlayStore;
    let boardStore;
    beforeEach(() => {
        gamePlayStore = createTestingPinia();
        gamePlayStore = useGamePlayStore();

        boardStore = createTestingPinia();
        boardStore = useBoardStore();

        storeFactory.gamePlayStoreFactory.mockImplementation(() => {
            return gamePlayStore;
        });
        storeFactory.boardStoreFactory.mockImplementation(() => {
            return boardStore;
        });
        boardStore.boards = boards;
    })


    test('testing the thrownNumber is set in the store when a roll event happens', () => {
        handleRollChange({ boardId: 1, playerId: '1', thrownNumber: 2 });
        expect(gamePlayStore.thrownNumber).toBe(2);
    })

    test('The board with the new position is set in the boardStore when positionChange event happens', async () => {
        expect(boardStore.boards[1].players[0].pieces[0].positionOnTheBoard).toBe(-1);
        boardStore.getBoard.mockResolvedValue(changedPosBoard);
        await handlePositionChange({ boardId: boards[1].id })
        expect(boardStore.boards[1].players[0].pieces[0].positionOnTheBoard).toBe(0);
    })

    test('robotStep function is called when positionChange event happens', async () => {
        boardStore.getBoard.mockResolvedValue(changedPosBoard);
        await handlePositionChange({ boardId: boards[1].id })
        expect(robotStep).toHaveBeenCalled();
    })

    test('The board with the new players is set in the boardStore when playerChange event happens', async () => {
        const numberOfPlayersBeforeLeave = boardStore.boards[1].players.length;
        boardStore.getBoard.mockResolvedValue(changedPlayerBoard);
        await handlePlayerChange({boardId: boards[1].id});
        expect(boardStore.boards[1].players.length).toBeLessThan(numberOfPlayersBeforeLeave);
    })


    test('The board with the FINISHED status is set in the gamePlayStore when statusChange event happens',async ()=>{
        boardStore.getBoard.mockResolvedValue(boardWithFinishedStatus);
        await handleStatusChange({newStatus: "FINISHED"});
        expect(gamePlayStore.playingBoard.status).toBe('FINISHED');
    })

    test('The new board with the CREATED status is added in the boardStore when statusChange event happens',async ()=>{
        const numberOfBoardsBeforeAddingNewBoard = boards.length;
        boardStore.getBoard.mockResolvedValue(createdBoard);
        await handleStatusChange({newStatus: 'CREATED'});

        expect(boardStore.boards.length).toBeGreaterThan(numberOfBoardsBeforeAddingNewBoard);
    })

    test('The reseted board with the CREATED status is set in the boardStore when statusChange event happens',async ()=>{
        const numberOfBoardsBeforeAddingNewBoard = boards.length;
        boardStore.getBoard.mockResolvedValue(resetedBoard);
        await handleStatusChange({newStatus: 'CREATED'});
        expect(boardStore.boards.length).toBe(numberOfBoardsBeforeAddingNewBoard);
    })



})