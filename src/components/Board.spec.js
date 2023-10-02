import { createTestingPinia } from "@pinia/testing";
import { shallowMount } from "@vue/test-utils";
import Board from 'src/components/Board.vue';
import PlayerDisplay from'src/components/PlayersDisplay.vue';
import { useBoardStore } from "src/store/boardStore";
import { initStatusChange, initPlayerChange } from "src/messaging/initHandleEvents";
import { nextTick } from "vue";


 jest.mock('src/messaging/initHandleEvents',()=> ({
    initStatusChange: jest.fn(),
    initPlayerChange:jest.fn()
 }))

 const boardWith2Players =  {
    boardName: "AlexTestBoard2",
    distanceBetweenPlayers: 10,
    id: "6458a73431146c5fb4d5fe68",
    nextPlayerId: "645e38ec31146c5fb4d6195f",
    numberOfPieces: 3,
    numberOfPlayer: 2,
    players: [
        {
            color: "Red",
            finishedRound: 0,
            id: "645e38ec31146c5fb4d6195f",
            name: "hgfjfghj",
            pieces: [
                {
                    gotAround: false,
                    id: "645e38ec31146c5fb4d61960",
                    positionOnTheBoard: -1
                },
                {
                    gotAround: false,
                    id: "645e38ec31146c5fb4d61961",
                    positionOnTheBoard: -1
                },
                {
                    gotAround: false,
                    id: "645e38ec31146c5fb4d61962",
                    positionOnTheBoard: 0
                }
            ],
            startingIndexOnBoard: 0
        },
        {
            color: "Red",
            finishedRound: 0,
            id: "645e38ec31146c5fb4d6195f",
            name: "hgfjfghj",
            pieces: [
                {
                    gotAround: false,
                    id: "645e38ec31146c5fb4d61960",
                    positionOnTheBoard: -1
                },
                {
                    gotAround: false,
                    id: "645e38ec31146c5fb4d61961",
                    positionOnTheBoard: -1
                },
                {
                    gotAround: false,
                    id: "645e38ec31146c5fb4d61962",
                    positionOnTheBoard: 0
                }
            ],
            startingIndexOnBoard: 0
        }
    ],
    status: "CREATED"
};

const finishedBoard = {
    boardName: "AlexTestBoard",
    distanceBetweenPlayers: 10,
    id: "6458a73431146c5fb4d5fe68",
    nextPlayerId: "645e38ec31146c5fb4d6195f",
    numberOfPieces: 3,
    numberOfPlayer: 2,
    players: [
        {
            color: "Red",
            finishedRound: 0,
            id: "645e38ec31146c5fb4d6195f",
            name: "hgfjfghj",
            pieces: [
                {
                    gotAround: false,
                    id: "645e38ec31146c5fb4d61960",
                    positionOnTheBoard: -1
                },
                {
                    gotAround: false,
                    id: "645e38ec31146c5fb4d61961",
                    positionOnTheBoard: -1
                },
                {
                    gotAround: false,
                    id: "645e38ec31146c5fb4d61962",
                    positionOnTheBoard: 0
                }
            ],
            startingIndexOnBoard: 0
        }
    
    ],
    status: "FINISHED"
};




describe("Testing Board component", () => {

    let wrapper;
    let boardStore;
    beforeEach(() => {
        wrapper = shallowMount(Board, {
            global:{
                plugins:[createTestingPinia()]
            },
            props: {
                board: {
                    boardName: "AlexTestBoard2",
                    distanceBetweenPlayers: 10,
                    id: "6458a73431146c5fb4d5fe68",
                    nextPlayerId: "645e38ec31146c5fb4d6195f",
                    numberOfPieces: 3,
                    numberOfPlayer: 2,
                    players: [
                        {
                            color: "Red",
                            finishedRound: 0,
                            id: "645e38ec31146c5fb4d6195f",
                            name: "hgfjfghj",
                            pieces: [
                                {
                                    gotAround: false,
                                    id: "645e38ec31146c5fb4d61960",
                                    positionOnTheBoard: -1
                                },
                                {
                                    gotAround: false,
                                    id: "645e38ec31146c5fb4d61961",
                                    positionOnTheBoard: -1
                                },
                                {
                                    gotAround: false,
                                    id: "645e38ec31146c5fb4d61962",
                                    positionOnTheBoard: 0
                                }
                            ],
                            startingIndexOnBoard: 0
                        }
                    ],
                    status: "STARTED"
                }
            }
        });
        boardStore = useBoardStore();
    })

    test("Board is rendered",()=>{
        
        expect(wrapper.text()).toContain('AlexTestBoard2');
    })

    test("Start button is disabled with only 1 player", () => {
        expect(wrapper.get('[data-test="startButton"]').attributes().disabled).toBeDefined();
    })

    test("Correct number of players is displayed", ()=>{
        expect(wrapper.text()).toContain('1/2');    
    })

    test("After pressing start button the startGame function is called ",async ()=>{
        await wrapper.setProps({
            board: boardWith2Players
        })
        //expect(wrapper.text()).toContain("STARTED");
        wrapper.get('[data-test="startButton"]').trigger("click");
        expect(boardStore.startBoard).toHaveBeenCalled();
        console.log(wrapper.html());
        
    })

    test("After pressing reset button the resetBoard function is called ", ()=>{
        wrapper.get('[data-test="resetButton"]').trigger("click");
        expect(boardStore.resetBoard).toHaveBeenCalled();   
    })
    
    test("After pressing stop button the stopBoard function is called ", ()=>{
        wrapper.get('[data-test="stopButton"]').trigger("click");
        expect(boardStore.stopBoard).toHaveBeenCalled();   
    })

    test("After pressing delete button the deleteGame function is called ",async  ()=>{
        boardStore.deleteBoard = jest.fn().mockImplementation(async ()=>{
            await wrapper.setProps({
                board: finishedBoard
            })
        });
        wrapper.get('[data-test="deleteButton"]').trigger("click");
        await nextTick();
        expect(boardStore.deleteBoard).toHaveBeenCalled();   
        expect(wrapper.text()).toContain("FINISHED");
    })

    test("Correct number of PlayerDetail component is rendered",()=>{
        expect(wrapper.findAllComponents(PlayerDisplay).length).toBe(1);
    })



    

})