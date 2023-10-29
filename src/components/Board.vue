<script setup>

import { useBoardStore } from 'src/store/boardStore';
import { computed, nextTick, ref } from 'vue';
import JoinPlayerPopup from './JoinPlayerPopup.vue';
import PlayersDisplay from './PlayersDisplay.vue';
import { initPlayerChange, initStatusChange } from 'src/messaging/initHandleEvents';
import { watch, onMounted } from 'vue';
const props = defineProps([
    "board"
])

const boardStore = useBoardStore();

let joiningPlayer = ref(false);



onMounted(async () => {
    await initPlayerChange(props.board);
    await initStatusChange(props.board);
})




watch(() => props.board, async (board) => {
    await nextTick();
})
async function navigateToPlayingBoard(boardId) {
    await boardStore.startBoard(boardId);
}



const isStartButtonDisabled = computed(() => {
    return !(props.board.players.length !== props.board.numberOfPlayer || props.board.status === "STARTED" || props.board.status === "FINISHED");
})

const isStopButtonDisabled = computed(() => {
    return (props.board.status === "STARTED")
})

const isResetButtonDisabled = computed(() => {
    return props.board.status === "FINISHED" || props.board.status === "STARTED"
})

const isJoinPlayerButtonDisabled = computed(()=> {
    return props.board.players.length < props.board.numberOfPlayer;
})

</script>

<template>
    <div class="card">
        <div class="card-text">
            <p>Name: <span class="board-name">{{ board.boardName }}</span></p>
            <p>Number of Players: <span class="num-players">{{ board.players.length + '/' + board.numberOfPlayer }}</span>
            </p>
            <p>Status: <span class="status">{{ board.status }}</span></p>
            <p>Distance between players: <span class="status">{{ board.distanceBetweenPlayers }}</span></p>
            <p>Players: <br></p>
            <li v-for="player in board.players" :key="player.id">
                <PlayersDisplay :boardId="board.id" :player="player"></PlayersDisplay>
            </li>
        </div>
        <JoinPlayerPopup :boardId="props.board.id" @joinPlayerPopUpOpen="(msg) => joiningPlayer = msg" v-if="joiningPlayer">
        </JoinPlayerPopup>
        <div class="buttons">
            <button data-test="startButton" :disabled="!isStartButtonDisabled" @click="navigateToPlayingBoard(board.id)"
                class="button is-success"><font-awesome-icon class="buttonIcons" :icon="['fas', 'play']"/>Start</button>
            <button data-test="stopButton" :disabled="!isStopButtonDisabled" @click="boardStore.stopBoard(board.id)"
                class="button is-danger"><font-awesome-icon class="buttonIcons" :icon="['fas', 'stop']"/>Stop</button>
            <button data-test="resetButton" :disabled="!isResetButtonDisabled" @click="boardStore.resetBoard(board.id)"
                class="button is-warning"><font-awesome-icon class="buttonIcons" :icon="['fas', 'rotate-left']" />Reset</button>
            <button data-test="joinPlayerButton" :disabled="!isJoinPlayerButtonDisabled" @click="joiningPlayer = true" class="button is-info"><font-awesome-icon class="buttonIcons" :icon="['fas', 'right-to-bracket']" />Join player</button>
            <button data-test="deleteButton" @click="boardStore.deleteBoard(board.id)" class="button is-danger"><font-awesome-icon class="buttonIcons" :icon="['fas', 'trash']" />Delete
                board</button>
        </div>
    </div>
</template>

<style scoped>
.card {
    border: 1px solid black;
    padding: 10px;
    margin: 10px;
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

}
.buttonIcons{
    margin-right: 3px;
}
strong {
    color: aliceblue;
}

.buttons {
    display: flex;
    align-items: center;
    justify-content: space-around;
}

button {
    font-size: 15px;
}

.card-text {
    font-family: Arial, sans-serif;
    font-size: 13px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.card-text p {
    margin: 0;
}

.board-name {
    font-weight: bold;
}

.num-players {
    color: blue;
}

.status {
    color: green;
}</style>
