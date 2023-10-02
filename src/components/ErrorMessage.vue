<template>
     <div v-if="!thrownNumberisSix && errorOccured"  class=" errorPanel notification is-danger">{{rawErrorMessageToNormal(errorMessage)}} </div>
     <div v-if="thrownNumberisSix" class="successPanel notification is-success">Hatost dobtál!</div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
import { useGamePlayStore } from'../store/gameplayStore';
import {rawErrorMessageToNormal} from '../helperFiles/ErrorMessageParser';
import { ref } from 'vue';

const gamePlayStore = useGamePlayStore();
const { errorMessage, errorOccured, thrownNumber} = storeToRefs(gamePlayStore);
let thrownNumberisSix = ref(false);
const errorTimer = () => {
    setTimeout(() => {
        errorOccured.value = false;
        thrownNumberisSix.value = false;
    },3500)
}

watch(errorOccured, (newValue) => {
    if(newValue) {
        errorTimer();
    }
});

watch(thrownNumber, (newValue) => {
    if(newValue===6) {
        thrownNumberisSix.value = true;
        errorTimer();
    }
});




</script>
<style scoped>
.errorPanel{
    position:fixed;
    top:0;
    width:100%;
    z-index:100;
}

.successPanel{
    position:fixed;
    top:0;
    width:100%;
    z-index:100;
}

</style>
