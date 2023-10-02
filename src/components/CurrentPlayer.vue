<template>
    <div class="card">
        <div class="card-text">
            <p>Name: <span data-test="playerName"
                    :style="{ color: convert(gamePlayStore.currentPlayer.color), textShadow: '1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000' }">{{
                        gamePlayStore.currentPlayer.name }}</span></p>
            <p>Starting index on board: <span class="num-players">{{ gamePlayStore.currentPlayer.startingIndexOnBoard
            }}</span></p>

            <p>Pieces: </p> <span
                :style="{ color: convert(gamePlayStore.currentPlayer.color), textShadow: '1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000' }">{{
                    gamePlayStore.currentPlayer.pieces.length }} </span>
            <div :style="{ width: gamePlayStore.currentPlayer.pieces.length * 30 }" :id="gamePlayStore.currentPlayer.id">
            </div>

        </div>
        <div class="buttons">
            <button data-test="rollButton" v-if="isItYourPlayer"
                @click="gamePlayStore.rollDice(props.board.id, { playerId: gamePlayStore.currentPlayer.id })"
                class="button is-info">Roll</button>
            <button data-test="rollButton" v-else title="Its not your turn" disabled class="button is-info">Roll</button>
            <button data-test="moveButton" v-if="isItYourPlayer"
                @click="gamePlayStore.movePlayer(props.board.id, { pieceId: gamePlayStore.selectedPiece?.id, playerId: gamePlayStore.currentPlayer.id, token: gamePlayStore.rollResponse.token })"
                class="button is-success ">Move</button>
            <button data-test="moveButton" v-else title="Its not your turn" disabled  class="button is-success ">Move</button>
        </div>
    </div>
</template>

<script setup>
import { convert } from './ColorNameToHex';
import { computed, onMounted } from 'vue';
import { useGamePlayStore } from 'src/store/gameplayStore';
import { watch, nextTick} from 'vue';
import { useBoardStore } from 'src/store/boardStore';
import {drawPieces} from "src/helperFiles/drawCurrentPlayerPieces"

const props = defineProps(["board"]);
const gamePlayStore = useGamePlayStore();
const boardStore = useBoardStore();
gamePlayStore.selectedPiece = gamePlayStore.currentPlayer.pieces[0];
watch(() => gamePlayStore.currentPlayer, async (currentPlayer) => {
    gamePlayStore.selectedPiece = currentPlayer.pieces.find(p=>p.positionOnTheBoard>-1);
    if(!gamePlayStore.selectedPiece) {
        gamePlayStore.selectedPiece = currentPlayer.pieces.find(p=>!p.gotAround);
    }
   
    await nextTick();
    drawPieces(currentPlayer);

})
const isItYourPlayer = computed(()=>{
    return boardStore.joinedPlayer.some(p=>p.id === gamePlayStore.currentPlayer.id) && !gamePlayStore.robotEnabled;
})
onMounted(() => {
    drawPieces(gamePlayStore.currentPlayer);
})






</script>

<style scoped>
.card {
    border: 1px solid black;
    padding: 10px;
    margin: 10px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

}

.buttons {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
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
    font-family: 'Courier New', Courier, monospace;
}

#pieces {
    height: 50px;
}

.board-name {
    font-weight: bold;
    color: blue;
}

.num-players {
    color: blue;
}
</style>