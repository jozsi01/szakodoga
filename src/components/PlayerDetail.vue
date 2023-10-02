<template>
    <div class="card">
        <div class="card-text">
            <p>Name: <span data-test="playerName"
                    :style="{ color: playerColorInHex, textShadow: '1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000' }">{{
                        player.name }}</span></p>
            <p>Starting index on board: <span class="num-players">{{ player.startingIndexOnBoard }}</span></p>
            <p>Pieces: </p> <span
                :style="{ color: playerColorInHex, textShadow: '1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000' }">{{
                    player.pieces.length }} </span>
        </div>
    </div>
</template>

<script setup>

import { convert } from './ColorNameToHex';
const props = defineProps(["player"]);
const playerColorInHex = convert(props.player.color);



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
}</style>