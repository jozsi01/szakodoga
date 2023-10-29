
import { router } from "src/vue-setup/router";
import { robotStep } from "src/robot/robotBehaviour";
import { gamePlayStoreFactory, boardStoreFactory } from "./storeFactory.js";
import gameplayStoreApi from "src/store/gameplayStoreApi.js";
async function handleStatusChange(statusChangeMessage) {
    const boardStore = boardStoreFactory();
    const gamePlayStore = gamePlayStoreFactory();
    if (statusChangeMessage.newStatus === "FINISHED") {
       await handleFinished(boardStore,gamePlayStore,statusChangeMessage);
    }
    else if (statusChangeMessage.newStatus === "STARTED" && boardStore.joinedPlayer.length > 0) {
       await handleStarted(boardStore,gamePlayStore,statusChangeMessage)
    }
    else if (statusChangeMessage.newStatus === "CREATED") {
       await handleCreated(boardStore,statusChangeMessage)
    }
}


async function handleFinished(boardStore,gamePlayStore,statusChangeMessage){
    const newBoard = await boardStore.getBoard(statusChangeMessage.boardId);
    await replaceBoardInBoardStore(boardStore, statusChangeMessage.boardId);
    gamePlayStore.playingBoard = newBoard;
    if (boardStore.joinedPlayer.length > 0) {
        router.push({
            name: "endGame",
        });
    }
}

async function handleCreated(boardStore,statusChangeMessage) {
    let newBoard = await boardStore.getBoard(statusChangeMessage.boardId);
    let index = boardStore.boards.findIndex(b => b.id === newBoard.id);
    if (index === -1) {
        boardStore.boards.push(newBoard);
    }
    else {
        boardStore.boards.splice(index, 1, newBoard);
    }
}

async function handleStarted(boardStore,gamePlayStore,statusChangeMessage) {
    boardStore.startedBoard = await boardStore.getBoard(statusChangeMessage.boardId);
    await replaceBoardInBoardStore(boardStore, statusChangeMessage.boardId);
    gamePlayStore.playingBoard = boardStore.startedBoard;

    if (boardStore.startedBoard.id === statusChangeMessage.boardId && boardStore.startedBoard.players.find(p => p.id === boardStore.joinedPlayer[boardStore.joinedPlayer.length - 1].id)) {
        router.push({
            name: "playing",
        });
    }
}


async function handlePlayerChange(playerChangeMessage) {
    const boardStore = boardStoreFactory();
    await replaceBoardInBoardStore(boardStore, playerChangeMessage.boardId);
}

async function handlePositionChange(positionChangeMessage) {
    console.log(positionChangeMessage)
    const gamePlayStore = gamePlayStoreFactory();
    const boardStore = boardStoreFactory();
    gamePlayStore.playingBoard = await boardStore.getBoard(positionChangeMessage.boardId);
    await replaceBoardInBoardStore(boardStore, positionChangeMessage.boardId);

    if (positionChangeMessage.nextPlayerId) {
        gamePlayStore.currentPlayer = gamePlayStore.playingBoard.players.find(p => p.id === positionChangeMessage.nextPlayerId);
    }
    else {
        gamePlayStore.currentPlayer = gamePlayStore.playingBoard.players[0];
    }
    await robotStep();

}

function handleRollChange(rollChangeMessage) {
    const gamePlayStore = gamePlayStoreFactory();
    gamePlayStore.thrownNumber = rollChangeMessage.thrownNumber;
}

async function replaceBoardInBoardStore(boardStore, id) {
    const board = await boardStore.getBoard(id);
    let index = boardStore.boards.findIndex(b => b.id === board.id);
    boardStore.boards.splice(index, 1, board);
}
export { handleStatusChange, handlePlayerChange, handlePositionChange, handleRollChange }