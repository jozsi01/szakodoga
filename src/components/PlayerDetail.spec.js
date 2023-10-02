import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import exp from 'constants';
import PlayerDetail from "src/components/PlayerDetail.vue";

describe("Testing PlayerDetail component",()=>{
    

    let wrapper;

    beforeEach(()=>{
        wrapper = mount(PlayerDetail,{
            global:{
                plugins:[createTestingPinia()]
            },
            props:{
                player:{
                    color: "Red",
                    finishedRound: 0,
                    id: "645e38ec31146c5fb4d6195f",
                    name: "testPlayer",
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
        })
    })

    test("PlayerDetail component is rendered",()=>{
        expect(wrapper.text()).toContain("testPlayer");
    })
    test("Number of pieces is displayed",()=>{
        console.log(wrapper.html());
        expect(wrapper.text()).toContain('3');
    })

    test('Player name is displayed with the right color', ()=>{
        console.log(wrapper.html());
        expect(wrapper.find('[data-test="playerName"]').element.style.color).toBe('red');
    })
})