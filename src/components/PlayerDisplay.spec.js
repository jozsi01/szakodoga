import { createTestingPinia } from "@pinia/testing";
import { mount, shallowMount } from "@vue/test-utils";
import PlayerDisplay from "src/components/PlayersDisplay.vue";
import { useBoardStore } from "src/store/boardStore";


describe("Testing PlayerDisplay component",()=>{

let boardStore;
let wrapper;

beforeEach(()=>{
    wrapper = mount(PlayerDisplay,{
        global:{
            plugins:[createTestingPinia()]
        },
        props:{
            boardId:2,
            player:{
                id: 1,
                name:"testPlayer",
                color:'red'
            }
        }
    })

    boardStore = useBoardStore();
})


test('PlayerDisplay component is rendered',()=>{
    expect(wrapper.text()).toContain("testPlayer");
})

test('Player name is displayed with the right color', ()=>{
    expect(wrapper.find('[data-test="playerName"]').element.style.color).toBe('red');
})


test("When clicking Leave button the boardStore leavePlayer function gets called with the right object",()=>{
    wrapper.find('[data-test="leavePlayerButton"]').trigger('click');
    expect(boardStore.leavePlayer).toHaveBeenCalledWith(2,{playerId: 1});
})


})