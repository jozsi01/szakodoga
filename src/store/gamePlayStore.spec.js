import { createPinia, setActivePinia } from "pinia";

import gameplayStoreApi from "src/store/gameplayStoreApi";
import { useGamePlayStore } from "src/store/gameplayStore";
jest.mock('src/store/gamePlayStoreApi.js');

describe("Testing gamePlayStore",()=>{

    let gamePlayStore = null;
    beforeEach(()=>{
        setActivePinia(createPinia());
        gamePlayStore = useGamePlayStore();

        gamePlayStore.disableRollButton = false;
        gamePlayStore.playingBoard = {};
    }) 
    
    test('rollDice function calls the correct function',async () => {
        await gamePlayStore.rollDice(1,{playerId:2});
        expect(gameplayStoreApi.rollDice).toHaveBeenCalled();
    })

    test('movePlayer function calls the correct function',async () => {
        gameplayStoreApi.movePlayer.mockResolvedValue({updatedBoard:'name'});
        await gamePlayStore.rollDice(1,{moveRequest:2});
        expect(gameplayStoreApi.rollDice).toHaveBeenCalled();
    })


})