<script setup>
import { convert } from './ColorNameToHex';
import { useBoardStore } from 'src/store/boardStore'; 

const props = defineProps(["boardId","player"]);

const boardStore = useBoardStore();
const playerColor = props.player.color;
const playerColorInHex = convert((playerColor));


</script>

<template>
    <span>
        <strong data-test="playerName" :style="{color: playerColorInHex, textShadow: '1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000'}"><font-awesome-icon :icon="['fas', 'user']" /> {{ player.name }}</strong>
        <button data-test="leavePlayerButton" @click="boardStore.leavePlayer(boardId,{playerId: props.player.id})" class="button is-danger is-small"> Leave</button>
    </span>
    
</template>

<style scoped>
button{
    height: 40%;
    margin-left: 5px;
    margin-top: 4px;
}

</style>

