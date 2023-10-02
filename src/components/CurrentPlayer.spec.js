import { createTestingPinia } from "@pinia/testing";
import { mount, shallowMount } from "@vue/test-utils";
import Konva from "konva";
import { nextTick } from "vue";
import CurrentPlayer from 'src/components/CurrentPlayer.vue';
import { useBoardStore } from "src/store/boardStore";
import { useGamePlayStore } from "src/store/gameplayStore";


jest.mock('src/helperFiles/drawCurrentPlayerPieces', () => ({
    drawPieces: jest.fn()
}))

Konva.isBrowser = false
describe("Testing CurrentPlayer component", () => {

    let wrapper;
    let boardStore;
    let gamePlayStore;

    beforeEach(() => {

        wrapper = mount(CurrentPlayer, {
            global: {
                plugins: [createTestingPinia({
                    initialState: {
                        gamePlayStore: {
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
                    },

                }

                )]
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
                            name: "testPlayer1",
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
                            color: "Green",
                            finishedRound: 0,
                            id: "645e38ec31146c5fb4d61955",
                            name: "testPLayer2",
                            pieces: [
                                {
                                    gotAround: false,
                                    id: "645e38ec31146c5fb4d61970",
                                    positionOnTheBoard: -1
                                },
                                {
                                    gotAround: false,
                                    id: "645e38ec31146c5fb4d61971",
                                    positionOnTheBoard: -1
                                },
                                {
                                    gotAround: false,
                                    id: "645e38ec31146c5fb4d61972",
                                    positionOnTheBoard: 0
                                }
                            ],
                            startingIndexOnBoard: 5
                        }
                    ],
                    status: "STARTED",
                }
            }
        })
        gamePlayStore = useGamePlayStore();
        boardStore = useBoardStore();


    })

    test('CurrentPlayer component is rendered', () => {
        console.log(wrapper.html());
        expect(wrapper.text()).toContain('hgfjfghj');
    })

    test('Correct number of the pieces is displayed', () => {
        expect(wrapper.text()).toContain("3");
    })

    test('When the player is not ours the buttons are disabled', () => {
        expect(wrapper.find('[data-test = "moveButton"]').element.disabled).toBe(true);
        expect(wrapper.find('[data-test = "rollButton"]').element.disabled).toBe(true);
    })

    test('When the current player is ours the button is not disabled', async () => {
        boardStore.joinedPlayer = [{
            color: "Red",
            finishedRound: 0,
            id: "645e38ec31146c5fb4d6195f",
            name: "testPlayer1"
        }];
        await nextTick();
        expect(wrapper.find('[data-test = "moveButton"]').element.disabled).toBe(false);
        expect(wrapper.find('[data-test = "rollButton"]').element.disabled).toBe(false);
    })

    test("When the current player has changed, the correct player's name is displayed",async () => {
        expect(wrapper.text()).toContain('hgfjfghj');
        gamePlayStore.currentPlayer = {
            color: "Green",
            finishedRound: 0,
            id: "645e38ec31146c5fb4d61955",
            name: "testPlayer2",
            pieces: [
                {
                    gotAround: false,
                    id: "645e38ec31146c5fb4d61970",
                    positionOnTheBoard: -1
                },
                {
                    gotAround: false,
                    id: "645e38ec31146c5fb4d61971",
                    positionOnTheBoard: -1
                },
                {
                    gotAround: false,
                    id: "645e38ec31146c5fb4d61972",
                    positionOnTheBoard: 0
                }
            ],
            startingIndexOnBoard: 5
        };
        await nextTick();
        expect(wrapper.text()).toContain('testPlayer2');
    })

    test("When clicking the roll button, the gameplaystore rollDice gets called with the right parameters",async ()=>{
        boardStore.joinedPlayer = [{
            color: "Red",
            finishedRound: 0,
            id: "645e38ec31146c5fb4d6195f",
            name: "testPlayer1"
        }];
        await nextTick();
        wrapper.find('[data-test = "rollButton"]').trigger('click');
        expect(gamePlayStore.rollDice).toHaveBeenCalledWith('6458a73431146c5fb4d5fe68',{playerId:'645e38ec31146c5fb4d6195f' });
    })

    test("When the current player name text color is the current player's color and changes if the current player changes",async ()=>{
        
        expect(wrapper.find('[data-test="playerName"]').element.style.color).toBe("red");
        gamePlayStore.currentPlayer = {
            color: "green",
            finishedRound: 0,
            id: "645e38ec31146c5fb4d61955",
            name: "testPlayer2",
            pieces: [
                {
                    gotAround: false,
                    id: "645e38ec31146c5fb4d61970",
                    positionOnTheBoard: -1
                },
                {
                    gotAround: false,
                    id: "645e38ec31146c5fb4d61971",
                    positionOnTheBoard: -1
                },
                {
                    gotAround: false,
                    id: "645e38ec31146c5fb4d61972",
                    positionOnTheBoard: 0
                }
            ],
            startingIndexOnBoard: 5
        };
        await nextTick();
        expect(wrapper.find('[data-test="playerName"]').element.style.color).toBe("green");
    })



})