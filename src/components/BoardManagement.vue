<script setup>
import { useBoardStore } from 'src/store/boardStore';
import Board from './Board.vue';
import CreateBoardPopup from './CreateBoardPopup.vue';
import { onMounted } from 'vue';
import ErrorMessage from './ErrorMessage.vue';
import { getEventSource } from 'src/helperFiles/EventSourceFactory';
import { ref } from 'vue';

const boardStore = useBoardStore();
const creatingNewBoard = ref(false);

onMounted(async () => {
    boardStore.eventSource = getEventSource();
    await boardStore.getBoards();
})



</script>

<template>
    <ErrorMessage />
    <div class="content">
        <div>
            <button data-test="createButton" @click="creatingNewBoard = !creatingNewBoard" class="button is-primary"><font-awesome-icon style="margin-right: 3px;" :icon="['fas', 'plus']" />Create
                Board</button>
        </div>
        
        <CreateBoardPopup data-test="createBoardPopup" @popupClose="(msg) => creatingNewBoard = msg"
            v-if="creatingNewBoard">
        </CreateBoardPopup>
        <h2>Boards: </h2>
        <section>
            <Board data-test="board" v-for="board in boardStore.boards" :key="board.id" :board="board" />
        </section>
    </div>
</template>

<style scoped>
button {
    width: 100%;
    height: 50px;
}

h2 {
    border-bottom: 2px solid grey;
}

section {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>