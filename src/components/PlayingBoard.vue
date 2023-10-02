
<script setup>
import Konva from 'konva'
import { computed, onMounted } from 'vue';
import PlayerDetail from './PlayerDetail.vue'
import CurrentPlayer from './CurrentPlayer.vue';
import { useBoardStore } from '../store/boardStore';
import { watch } from 'vue';
import ErrorMessage from './ErrorMessage.vue';
import { initRollChange, initPositionChange } from 'src/messaging/initHandleEvents';
import { useGamePlayStore } from 'src/store/gameplayStore';
import { convert } from './ColorNameToHex';
import { setUpBoardWithMorePlayer, setUpBoardWith2Player } from 'src/helperFiles/drawBoard.js';
import { robotStep } from 'src/robot/robotBehaviour';
const gamePlayStore = useGamePlayStore();
const boardStore = useBoardStore();


let board = boardStore.startedBoard;
console.log(board);
gamePlayStore.currentPlayer = (findPlayerById(board.nextPlayerId));


watch(() => gamePlayStore.playingBoard, (playingBoard) => {
    board = playingBoard;
})
let stage;
let tweens = [];

gamePlayStore.robotEnabled = false;


let playersWihoutCurrentPlayer = computed(() => {
    return board.players.filter(p => p.id !== gamePlayStore.currentPlayer.id);
})

watch(() => gamePlayStore.robotEnabled, async (robotEnabled) => {
    if (robotEnabled) {
        await robotStep();
    }
})

onMounted(async () => {
    await initRollChange(board);
    await initPositionChange(board);
    const containerWidth = document.getElementById("container").offsetWidth;
    const containerHeight = document.getElementById("container").offsetHeight;
    if (board.players.length === 2) {
        stage = setUpBoardWith2Player(board, containerWidth, containerHeight);
    }
    else {
        stage = setUpBoardWithMorePlayer(board, containerWidth, containerHeight);
    }

    watch(() => gamePlayStore.playingBoard, (playingBoard) => {
        if (playingBoard.players) {
            for (var n = 0; n < tweens.length; n++) {
                tweens[n].destroy();
            }
            let circles = stage.find('Circle')

            circles.forEach(function (shape) {
                let circleHasPlayer = false;
                for (let q = 0; q < playingBoard.players.length; q++) {
                    for (let i = 0; i < playingBoard.players[q].pieces.length; i++) {
                        if (shape.id() == playingBoard.players[q].pieces[i].positionOnTheBoard) {
                            circleHasPlayer = true;
                            tweens.push(new Konva.Tween({
                                node: shape,
                                duration: 0.5,
                                fill: convert(playingBoard.players[q].color),
                                easing: Konva.Easings['EaseOut']
                            }).play());
                        }
                    }
                }
                if (!circleHasPlayer) {
                    tweens.push(new Konva.Tween({
                        node: shape,
                        duration: 0.5,
                        fill: "white",
                        easing: Konva.Easings['EaseOut']
                    }).play());
                }
            });
        }
    })
})
function findPlayerById(Id) {
    const player = board.players.find(p => p && p.id === Id);
    return player;
}
</script>

<template>
    <div class="main content">
        <ErrorMessage />

        <h1>{{ board.boardName }}</h1>
        <div class="board content">
            <div id="players">
                <h2>Current player: </h2>
                <CurrentPlayer :board="board" />
                <div class="robot">

                    <div class="field">
                        <input data-test="robotCheckbox" id="robotEnable" type="checkbox" name="robotEnable" class="switch"
                            v-model="gamePlayStore.robotEnabled">
                        <label for="robotEnable">Robot</label>
                    </div>

                </div>

                <h2>Players: </h2>
                <PlayerDetail v-for="player in playersWihoutCurrentPlayer" :key="player.id" :player="player" />
            </div>

            <div id="container">
                <div id="board">
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
#container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-basis: 80%;
    align-items: center;

    height: 100vh;
}

.robot {
    display: flex;
}

h1 {
    padding-bottom: 20px;
    font-weight: 900;
}

h2 {
    border-bottom: 2px solid grey;
    padding-right: 20px;
}

#players {
    display: flex;
    flex-direction: column;
    flex-basis: 20%;
}

#currentPlayer {
    display: flex;
    flex-direction: column;
    border: 1px solid red;
    flex-basis: 20%;
}

.board {
    display: flex;
    flex-direction: row;

}
</style>
