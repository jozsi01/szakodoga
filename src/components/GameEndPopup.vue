
<script setup>

import { useGamePlayStore } from "../store/gameplayStore";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { convert } from './ColorNameToHex';
import {closeScoreboard} from 'src/helperFiles/closeScoreBoard';

const gamePlayStore = useGamePlayStore();
const router = useRouter();
onMounted(() => {

    const players = gamePlayStore.playingBoard.players
    const sorted = players.sort((p1, p2) => p1.finishedRound - p2.finishedRound);

    const player = sorted.shift();
    sorted.push(player);

    var tableBody = document.getElementById("player-table").getElementsByTagName('tbody')[0];

    // Generate table rows dynamically
    for (var i = 0; i < sorted.length; i++) {
        let player = sorted[i];
        let row = document.createElement("tr");
        
        let placeCell = document.createElement("td");
        placeCell.textContent = i + 1 + ".";
        row.appendChild(placeCell);

        let nameCell = document.createElement("td");
        nameCell.textContent = player.name;
        
        
        nameCell.style.textShadow = '1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000';
        nameCell.style.color = convert(player.color);
        row.appendChild(nameCell);

        let scoreCell = document.createElement("td");
        scoreCell.textContent = player.finishedRound;
        row.appendChild(scoreCell);

        tableBody.appendChild(row);


    }

})
// Generate scoreboard


</script>

<template>
    <div class="content">
        <h1>ScoreBoard</h1>
        <div class="mainDiv">
            <table data-test="playerHierarchy" id="player-table">
                <thead>
                    <tr>
                        <th>Place</th>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Table body will be generated dynamically -->
                </tbody>
            </table>
        </div>
        <div class="okbutton">
            <button data-test="okButton" class="button is-success" @click="closeScoreboard(router)">Ok</button>
        </div>
    </div>
</template>


<style scoped>
.mainDiv {
    display: flex;
    justify-content: center;
}
h1{
    display: flex;
    justify-content: center;
}

table {
    border-collapse: collapse;
}

td {
    border: 1px solid black;
    padding: 8px;
}

.okbutton {
    display: flex;
    justify-content: center;
}
</style>