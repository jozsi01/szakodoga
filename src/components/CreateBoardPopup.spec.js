import { createTestingPinia } from '@pinia/testing';
import CreateBoardPopup from 'src/components/CreateBoardPopup.vue';
import { useBoardStore } from 'src/store/boardStore';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import exp from 'constants';


describe("Testing CreateBoardPopup component", ()=>{
    let wrapper;
    let boardStore;


    beforeEach(()=>{
        wrapper = mount(CreateBoardPopup, {
            global:{
                plugins:[createTestingPinia()]
            },
        })
        boardStore = useBoardStore();
    })

    test("CreateBoardPopup is rendered",()=>{
        expect(wrapper.text()).toContain("Create New Board");
    })

    test("At first when the inputs are empty, the Create button is disabled",()=>{
        expect(wrapper.get('[data-test="createButton"]').element.disabled).toBe(true);
    })

    test("When every input is filled with value the Create button is not disabled",async ()=>{
        await wrapper.find('[data-test="nameInput"]').setValue("testInput");
        await wrapper.find('[data-test="distanceBetweenPlayersInput"]').setValue(5);
        await wrapper.find('[data-test="numberOfPiecesInput"]').setValue(3);
        await wrapper.find('[data-test="numberOfPlayerInput"]').setValue(5);

        await nextTick();

        expect(wrapper.get('[data-test="createButton"]').element.disabled).toBe(false);
    })

    test("When the input is filled with wrong parameters the Create button stays disabled", async () =>{
        await wrapper.find('[data-test="nameInput"]').setValue("testInput");
        await wrapper.find('[data-test="distanceBetweenPlayersInput"]').setValue(5);
        await wrapper.find('[data-test="numberOfPiecesInput"]').setValue(3);
        await wrapper.find('[data-test="numberOfPlayerInput"]').setValue(1);

        await nextTick();

        expect(wrapper.get('[data-test="createButton"]').element.disabled).toBe(true);
    })

    test("When the Create button is clicked it calls the boardStore createBoard function with the right object", async ()=>{
        await wrapper.find('[data-test="nameInput"]').setValue("testInput");
        await wrapper.find('[data-test="distanceBetweenPlayersInput"]').setValue(5);
        await wrapper.find('[data-test="numberOfPiecesInput"]').setValue(3);
        await wrapper.find('[data-test="numberOfPlayerInput"]').setValue(5);

        await nextTick();

        wrapper.find('[data-test="createButton"]').trigger('click');
        const createdBoard = {boardName:'testInput',distanceBetweenPlayers:5,numberOfPieces:3,numberOfPlayer:5}
        expect(boardStore.createBoard).toHaveBeenCalledWith(createdBoard);
    })

    test("When the Cancel button is clicked it emits the false value",async ()=>{
        wrapper.find('[data-test="cancelButton"]').trigger('click');
        await nextTick();
        expect(wrapper.emitted().popupClose[0]).toEqual([false]);
    })

})