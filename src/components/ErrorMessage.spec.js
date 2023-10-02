import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import ErrorMessage from "src/components/ErrorMessage.vue";
import { useGamePlayStore } from "src/store/gameplayStore";
describe("Testing ErrorMessage component",()=>{

    let wrapper;
    let gameplayStore;

    beforeEach(()=>{
        wrapper = mount(ErrorMessage,{
            global:{
                plugins:[createTestingPinia()]
            }

        })
        gameplayStore = useGamePlayStore();
    })

    test("When error occured and the thrown number is not 6, the error panel gets displayed",async()=>{
        gameplayStore.errorMessage = "Test_error_message";
        gameplayStore.errorOccured = true;
        gameplayStore.thrownNumber = 3;
        await nextTick();
        console.log(wrapper.html());
        expect(wrapper.html()).toContain('is-danger');
    
    })

    test("When the thrown number is 6, the success panel gets displayed",async()=>{
        gameplayStore.errorMessage = "Test_error_message";
        gameplayStore.errorOccured = false;
        gameplayStore.thrownNumber = 6;
        await nextTick();
        console.log(wrapper.html());
        expect(wrapper.html()).toContain('is-success');
    
    })
    jest.useFakeTimers()
    test("The error panel gets displayed, after 3500ms it dissapears",async ()=>{
        gameplayStore.errorOccured = true;
        gameplayStore.errorMessage = "Test_error_message";
        gameplayStore.thrownNumber = 4;
        await nextTick();
        console.log(wrapper.html());
        jest.advanceTimersByTime(3500);
        await nextTick();
        console.log(wrapper.html());
        expect(wrapper.text()).not.toContain("errorPanel");
    })

    test("The success panel gets displayed, after 3500ms it dissapears",async ()=>{
       
        gameplayStore.errorMessage = "Test_error_message";
        gameplayStore.thrownNumber = 6;
        await nextTick();
        console.log(wrapper.html());
        jest.advanceTimersByTime(3500);
        await nextTick();
        console.log(wrapper.html());
        expect(wrapper.text()).not.toContain("successPanel");
    })

})

