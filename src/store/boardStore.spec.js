import { setActivePinia, createPinia } from "pinia";
import { useBoardStore } from "./boardStore";
import boardStoreApis from 'src/store/boardStoreApi';

jest.mock('src/store/boardStoreApi.js');


describe('Testing boardStore', () => {
    let boardStore = null;

    beforeEach(() => {
        setActivePinia(createPinia());
        boardStore = useBoardStore();
        boardStore.boards = [{ id: 1, name: 'test' }];
    })

    test('getBoards function calls the correct function',async () => {
       await boardStore.getBoards();
        expect(boardStoreApis.getBoards).toHaveBeenCalled();
    })

    test('getBoard function calls the correct function with the right parameter',async () => {
        await boardStore.getBoard(2);
        expect(boardStoreApis.getBoard).toHaveBeenCalledWith(2);
    })

    test('deleteBoard function calls the correct function with the right parameter',async () => {
       
        boardStoreApis.getBoards.mockImplementation(() => {
            return { id: 1,board: 'testBoard' };
        });
        await boardStore.deleteBoard(2);
        
        expect(boardStoreApis.deleteBoard).toHaveBeenCalledWith(2);
    })

    test('createBoard function calls the correct function with the right parameter',async () => {
        await boardStore.createBoard({ vmi: "boardTest" });
        expect(boardStoreApis.createBoard).toHaveBeenCalledWith({ vmi: "boardTest" });
    })

    test('startBoard function calls the correct function with the right parameter',async () => {
        
        boardStoreApis.startBoard.mockResolvedValue(
            { id: 1, name: "test2", players: [{ id: 2 }] });
        await boardStore.startBoard(1);
        expect(boardStoreApis.startBoard).toHaveBeenCalledWith(1);
    })

    test('stopBoard function calls the correct function with the right parameter',async () => {
      
        boardStoreApis.stopBoard.mockResolvedValue(
            { id: 1, name: "test2", players: [{ id: 2 }] });
        await boardStore.stopBoard(1);
        
        expect(boardStoreApis.stopBoard).toHaveBeenCalledWith(1);
    })

    test('resetBoard function calls the correct function with the right parameter', async() => {
        
        boardStoreApis.resetBoard.mockResolvedValue(
            { id: 1, name: "test2", players: [{ id: 2 }] });
        await boardStore.resetBoard(1);
       
        expect(boardStoreApis.resetBoard).toHaveBeenCalledWith(1);
    })

    test('getColors function calls the correct function',async () => {
        await boardStore.getColors();
        expect(boardStoreApis.getColors).toHaveBeenCalled();
    })


    test('joinPlayer function calls the correct function with the right parameters',async () => {
        await boardStore.joinPlayer(1, { vmi: "test" });
        expect(boardStoreApis.joinPlayer).toHaveBeenCalledWith(1, { vmi: "test" });
    })

    test('leavePlayer function calls the correct function with the right parameters', async () => {
       
        boardStoreApis.leavePlayer.mockResolvedValue({id:1});
        await boardStore.leavePlayer(1, { name: "test" });
        expect( boardStoreApis.leavePlayer).toHaveBeenCalled();
    })





})