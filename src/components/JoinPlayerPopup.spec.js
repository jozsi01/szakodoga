import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { wrap } from "module";
import JoinPlayerPopup from "src/components/JoinPlayerPopup.vue";
import { useBoardStore } from "src/store/boardStore";
import { nextTick } from "vue";


describe("Testing JoinPlayerPopup component",()=>{

    let wrapper;
    let boardStore;

    beforeEach(()=>{
        wrapper = mount(JoinPlayerPopup,{
            global:{
                plugins:[createTestingPinia()]
            },
            props:{
                boardId: 1
            }
        })
        boardStore = useBoardStore();
    })

    test("JoinPlayerPopup is rendered",()=>{
        expect(wrapper.text()).toContain("Join Player");
    })

    test("The right amount of available colors gets displayed",async ()=>{
        boardStore.colors = ["red","blue","green"];
        await nextTick();
        expect(wrapper.find("select").findAll("option").length).toBe(3);
    })

    test("Join button is disabled when not giving both the color and the name",async ()=>{
        await wrapper.find('[data-test="nameInput"]').setValue("testPlayer");
        expect(wrapper.get('[data-test="joinButton"]').element.disabled).toBe(true);
    })

    test("When clicking the join button it emits a false value", async ()=>{
        await wrapper.find('[data-test="nameInput"]').setValue("testPlayer");
        boardStore.colors = ["red","blue","green"];
        await nextTick();
        const options =wrapper.find("select").findAll("option")
        await options.at(1).setSelected();
        wrapper.find('[data-test="joinButton"]').trigger('click');
        await nextTick();
        expect(wrapper.emitted().joinPlayerPopUpOpen[0]).toEqual([false]);
    })

    test("The boardStore joinPlayer function gets called with the right parameters",async ()=>{
        await wrapper.find('[data-test="nameInput"]').setValue("testPlayer");
        boardStore.colors = ["red","blue","green"];
        await nextTick();
        const options =wrapper.find("select").findAll("option")
        await options.at(1).setSelected();
        wrapper.find('[data-test="joinButton"]').trigger('click');

        expect(boardStore.joinPlayer).toHaveBeenCalledWith(1,{name:"testPlayer", color:"blue"});
    })


})