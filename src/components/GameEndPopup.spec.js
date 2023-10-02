import { createTestingPinia } from "@pinia/testing";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { nextTick } from "vue";
import GameEndPopup from 'src/components/GameEndPopup.vue';
import { useBoardStore } from "src/store/boardStore";
import { createRouter } from "vue-router";
import { useRouter } from "vue-router";
import {createWebHistory}from "vue-router";
import BoardManagement from 'src/components/BoardManagement.vue';
import { closeScoreboard } from "src/helperFiles/closeScoreBoard";

jest.mock('src/helperFiles/closeScoreBoard',()=> ({
    closeScoreboard:jest.fn()
 }))

 jest.mock('vue-router',()=>({
    useRouter:jest.fn(),
    createRouter: jest.fn(),
    createWebHistory:jest.fn()
 }))

describe("Testing GameEndPopup component",()=>{
    enableAutoUnmount(afterEach);
    let wrapper;
    let boardStore;
    beforeEach(()=>{
        const table = document.createElement('table');
        table.id = 'player-table';
        document.body.appendChild(table);
        wrapper = mount(GameEndPopup,{
            attachTo: document.getElementById('player-table'),
            
            global:{
                
                plugins:[createTestingPinia({
                    initialState:{
                        gamePlayStore:{
                            playingBoard:{
                                "boardName": "asdf",
                                "distanceBetweenPlayers": 3,
                                "id": "649044365e04bd5e2a113650",
                                "nextPlayerId": null,
                                "numberOfPieces": 3,
                                "numberOfPlayer": 3,
                                "players": [
                                    {
                                        "color": "Orange",
                                        "finishedRound": 3,
                                        "id": "649d2cd95e04bd5e2a1149b5",
                                        "name": "asf",
                                        "pieces": [
                                            {
                                                "gotAround": false,
                                                "id": "649d2cd95e04bd5e2a1149b6",
                                                "positionOnTheBoard": -1
                                            },
                                            {
                                                "gotAround": false,
                                                "id": "649d2cd95e04bd5e2a1149b7",
                                                "positionOnTheBoard": -1
                                            },
                                            {
                                                "gotAround": false,
                                                "id": "649d2cd95e04bd5e2a1149b8",
                                                "positionOnTheBoard": -1
                                            }
                                        ],
                                        "startingIndexOnBoard": 0
                                    },
                                    {
                                        "color": "Aqua",
                                        "finishedRound": 5,
                                        "id": "649d2cdc5e04bd5e2a1149b9",
                                        "name": "sdfg",
                                        "pieces": [
                                            {
                                                "gotAround": false,
                                                "id": "649d2cdc5e04bd5e2a1149ba",
                                                "positionOnTheBoard": -1
                                            },
                                            {
                                                "gotAround": false,
                                                "id": "649d2cdc5e04bd5e2a1149bb",
                                                "positionOnTheBoard": -1
                                            },
                                            {
                                                "gotAround": false,
                                                "id": "649d2cdc5e04bd5e2a1149bc",
                                                "positionOnTheBoard": -1
                                            }
                                        ],
                                        "startingIndexOnBoard": 3
                                    },
                                    {
                                        "color": "Blue Violet",
                                        "finishedRound": 0,
                                        "id": "649d2cdf5e04bd5e2a1149bd",
                                        "name": "ert",
                                        "pieces": [
                                            {
                                                "gotAround": false,
                                                "id": "649d2cdf5e04bd5e2a1149be",
                                                "positionOnTheBoard": -1
                                            },
                                            {
                                                "gotAround": false,
                                                "id": "649d2cdf5e04bd5e2a1149bf",
                                                "positionOnTheBoard": -1
                                            },
                                            {
                                                "gotAround": false,
                                                "id": "649d2cdf5e04bd5e2a1149c0",
                                                "positionOnTheBoard": -1
                                            }
                                        ],
                                        "startingIndexOnBoard": 6
                                    }
                                ],
                                "status": "FINISHED"
                            }
                        }
                    }
                })]
            }
        })
        boardStore = useBoardStore();
    })



    test("GameEndpopup is rendered",()=>{
        
        expect(wrapper.text()).toContain("ScoreBoard");
    })

    test('The players are displayed in the finishing order',()=>{
        expect(wrapper.find('[data-test="playerHierarchy"]').element.rows[1].cells[1].textContent).toBe('asf');
        expect(wrapper.find('[data-test="playerHierarchy"]').element.rows[2].cells[1].textContent).toBe('sdfg');
        expect(wrapper.find('[data-test="playerHierarchy"]').element.rows[3].cells[1].textContent).toBe('ert');
    })


    test('The players are displayed with their color',()=>{
      
        expect(wrapper.find('[data-test="playerHierarchy"]').element.rows[1].cells[1].style.color).toBe('orange');
        expect(wrapper.find('[data-test="playerHierarchy"]').element.rows[2].cells[1].style.color).toBe('aqua');
        expect(wrapper.find('[data-test="playerHierarchy"]').element.rows[3].cells[1].style.color).toBe('blueviolet');
    })

    test('When clicking the Ok button the router push method gets called',async ()=>{
        
        wrapper.find('[data-test="okButton"]').trigger('click');
        await nextTick()
       
        expect(closeScoreboard).toHaveBeenCalled();
    })



})