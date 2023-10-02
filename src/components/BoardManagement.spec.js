import { createTestingPinia } from '@pinia/testing';
import { mount, shallowMount } from '@vue/test-utils';
import BoardManagement from 'src/components/BoardManagement.vue';
import Konva from "konva";
import { useBoardStore } from 'src/store/boardStore';
import { nextTick } from 'vue';
import { wrap } from 'module';
import {getEventSource} from 'src/helperFiles/EventSourceFactory';

jest.mock('src/helperFiles/EventSourceFactory',()=> ({
    getEventSource: jest.fn(),
 }))
Konva.isBrowser = false;
describe('Testing Board management component', () => { 
    let wrapper;
    let boardStore;
    const testBoards = [
        {
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
            status: "STARTED",
        },{
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
            status: "STARTED",
        }];

    beforeEach(() => {
       const pinia = createTestingPinia();
       pinia.state.value['boardStore'] = {boards: testBoards};
        wrapper = shallowMount(BoardManagement,{
            global: {
                plugins: [pinia],
            },
        });
        boardStore = useBoardStore();
        
    })
   

    test("Is the component rendered",  () => {
       
        expect(wrapper.text()).toContain('Boards');
    });

    test("The correct amount of boards are rendered",()=>{
        expect(wrapper.findAll('[data-test="board"]')).toHaveLength(2);
    })

    test("When clicking create new board button the createBoardPopup pops up",async ()=>{
        wrapper.get('[data-test="createButton"]').trigger('click');
        await nextTick();
        expect(wrapper.get('[data-test="createBoardPopup"]')).toBeTruthy();
    })
    
})