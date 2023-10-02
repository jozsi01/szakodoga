<script setup>
import { useBoardStore } from 'src/store/boardStore';
import { computed } from 'vue';
import { reactive } from 'vue';

const boardStore = useBoardStore();
const createdBoard = reactive({boardName:'',distanceBetweenPlayers:0,numberOfPieces:0,numberOfPlayer:0});
const emit = defineEmits(["popupClose"]);

const inputValidation = computed(() => {
    return createdBoard.boardName.length>=3 && createdBoard.distanceBetweenPlayers>=2 
    && createdBoard.numberOfPieces>=1 && createdBoard.numberOfPlayer>=2;
})

</script>



<template>
    <div class="popup-container">
        <div class="popup">
            <slot/>
            <div class="popupInner">
                <h2>Create New Board</h2>
                <div class="field">
                    <label>Name:</label>
                    <div class="control">
                        <input data-test="nameInput" type="text" placeholder="Board name" v-model="createdBoard.boardName">
                    </div>
                </div>
                    
                <div class="field">
                    <label>Distance between players: </label>
                    <div class="control">
                        <input data-test="distanceBetweenPlayersInput" type="number" v-model="createdBoard.distanceBetweenPlayers">
                    </div>
                </div>
                    
                <div class="field">
                    <label>Number of pieces: </label>
                    <div class="control">
                        <input data-test="numberOfPiecesInput" type="number" v-model="createdBoard.numberOfPieces">
                    </div>
                </div>  
                   
                <div class="field">
                    <label>Number of players: </label>
                    <div class="control">
                        <input data-test="numberOfPlayerInput" type="number" v-model="createdBoard.numberOfPlayer">
                    </div>
                </div>  
                   
                   
                <button data-test="createButton" v-if="inputValidation" class="button is-success" @click="boardStore.createBoard(createdBoard); emit('popupClose',false)">Create</button>
                <button data-test="createButton" v-else class="button is-succes" title="Disabled button" disabled>Create</button>
                <button  data-test="cancelButton" @click="emit('popupClose',false)" class="button is-danger">Cancel</button>
                    
                
            </div>

        </div>
    </div>
</template>


<style scoped>
.popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.2);

    display: flex;
    align-items: center;
    justify-content: center;
}

.popupInner {
    background: #FFF;
    padding: 32px;
}
form{
     display: flex;
    flex-direction: column;
}
</style>