import { createTestingPinia } from "@pinia/testing";
import { mount, shallowMount } from "@vue/test-utils";
import PlayingBoard from 'src/components/PlayingBoard.vue';
import { useBoardStore } from "src/store/boardStore";
import { useGamePlayStore } from "src/store/gameplayStore";
import PlayerDetail from 'src/components/PlayerDetail.vue';
import { robotStep } from "src/robot/robotBehaviour";


jest.mock('src/messaging/initHandleEvents', () => ({
    initRollChange: jest.fn(),
    initPositionChange: jest.fn()
}))
jest.mock('src/helperFiles/drawBoard', () => ({
    setUpBoardWith2Player:jest.fn(),
    setUpBoardWithMorePlayer:jest.fn()
}))

jest.mock('src/robot/robotBehaviour', () => ({
    robotStep:jest.fn(),
}))

describe("Testing playingBoard component", () => {

    let wrapper;

    beforeEach(() => {
        const div = document.createElement('div')
        div.id = 'container'
        document.body.appendChild(div)
        wrapper = shallowMount(PlayingBoard, {

            attachTo: document.getElementById('container'),
            global: {
                plugins: [createTestingPinia({
                    initialState: {
                        boardStore: {
                            startedBoard: {
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
                                        color: "green",
                                        finishedRound: 0,
                                        id: "645e38ec31146c5fb4d61950",
                                        name: "testPlayer2",
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
                        },
                        gamePlayStore: {
                            playingBoard: {
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
                                        color: "green",
                                        finishedRound: 0,
                                        id: "645e38ec31146c5fb4d61950",
                                        name: "testPlayer2",
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
                            },
                            currentPlayer: {
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
                        }
                    }
                }
                )]

            }
        })

    })

    test('PlayingBoard component is rendered', () => {
        console.log(wrapper.html());
        expect(wrapper.text()).toContain('AlexTestBoard2');
    })

    test("Correct amount of PlayerDetail component is rendered",()=>{
        expect(wrapper.findAllComponents(PlayerDetail).length).toBe(1);
    })

    test('Enabling robot calls the robotStep function',async ()=>{
        await wrapper.find('[data-test="robotCheckbox"]').setChecked();
        expect(robotStep).toHaveBeenCalled();
    })

})