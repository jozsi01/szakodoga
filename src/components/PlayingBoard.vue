
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
import { faChessPawn } from "@fortawesome/free-solid-svg-icons";
import DropdownComponent from "./DropdownComponent.vue"
const gamePlayStore = useGamePlayStore();
const boardStore = useBoardStore();


let board = boardStore.startedBoard;
console.log(board);
gamePlayStore.currentPlayer = (findPlayerById(board.nextPlayerId));


watch(() => gamePlayStore.playingBoard, (playingBoard) => {
    board = playingBoard;
})
let stage;

gamePlayStore.robotEnabled = false;


let playersWihoutCurrentPlayer = computed(() => {
    return board.players.filter(p => p.id !== gamePlayStore.currentPlayer.id);
})



watch(() => gamePlayStore.robotEnabled, async (robotEnabled) => {
    if (robotEnabled) {
        await robotStep();
    }
})
function findPieceInStage(piece) {
    const pieces = stage.find("Path")
    return pieces.find(p => p.attrs.id == piece.id)
}
function removeEveryOutline(paths) {
    paths.forEach(function (path) {
        path.stroke(null);
        path.strokeWidth(0)
    })
}
function removePathsFromLayer(layer) {
    const children = layer.getChildren(); // Get all children of the layer

    // Iterate through the children and remove Konva.Path objects
    for (let i = children.length - 1; i >= 0; i--) {
        const child = children[i];

        if (child instanceof Konva.Path) {
            child.destroy(); // Remove the Konva.Path object
        }
    }

    layer.draw(); // Redraw the layer to apply the changes
}
const ICON_ARANY = faChessPawn.icon[0] / faChessPawn.icon[1];
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
    watch(() => gamePlayStore.selectedPiece, (selectedpiece) => {
        let paths = stage.find("Path");
        removeEveryOutline(paths);
        let selectedPiece = findPieceInStage(selectedpiece);
        if (selectedPiece) {
            selectedPiece.stroke('black');
            selectedPiece.strokeWidth(10);
        }

    })
    watch(() => gamePlayStore.playingBoard, (playingBoard) => {
        if (playingBoard.players) {

            let circles = stage.find('Circle')
            removePathsFromLayer(stage.children[0])
            circles.forEach(function (field) {
                for (let q = 0; q < playingBoard.players.length; q++) {
                    for (let i = playingBoard.players[q].pieces.length - 1; i >= 0; i--) {
                        if (field.id() == playingBoard.players[q].pieces[i].positionOnTheBoard) {

                            var piece = new Konva.Path({
                                x: field.x() - field.radius() / 2,
                                y: field.y() - (field.radius()) + 3,
                                data: faChessPawn.icon[4],
                                fill: convert(playingBoard.players[q].color),
                                scaleX: ((field.radius() * 1.5) / faChessPawn.icon[0]) * ICON_ARANY,
                                scaleY: (field.radius() * 1.5) / faChessPawn.icon[1],
                                id: playingBoard.players[q].pieces[i].id
                            });
                            piece.on('mousedown', function () {
                                gamePlayStore.selectedPiece = gamePlayStore.currentPlayer.pieces.find(p => p.id == piece.id());
                            })

                            stage.children[0].add(piece);
                        }
                    }
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
        <div class="boardContent">
            <div id="players">
                <h2>Current player: </h2>
                <CurrentPlayer :board="board" />
                <DropdownComponent />
                <div class="restOfThePlayers">
                    <h2>Players: </h2>
                    <PlayerDetail v-for="player in playersWihoutCurrentPlayer" :key="player.id" :player="player" />
                </div>
            </div>
            <div id="container">
                <div id="board"> </div>
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
    border: 1px solid red;
    height: 100vh;
}
.boardContent{
    display: flex;
}
.robot {
    display: flex;
    flex-direction: column;
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
    flex-basis: 20%;
}

.board {
    display: flex;
    flex-direction: row;

}
</style>
