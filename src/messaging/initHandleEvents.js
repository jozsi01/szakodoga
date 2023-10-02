import { useBoardStore } from "src/store/boardStore";
import { useGamePlayStore } from "src/store/gameplayStore";

import { robotStep } from "src/robot/robotBehaviour";
import { handleStatusChange,handlePlayerChange, handlePositionChange, handleRollChange } from "./handleEvents.js";


async function initPlayerChange(board) {
    const boardStore = useBoardStore();
    boardStore.eventSource.addEventListener("PlayerChange" + board.id, async function (event) {
        let newStatus = JSON.parse(event.data);
        await handlePlayerChange(newStatus);
    })
}
async function initStatusChange(board) {
    const boardStore = useBoardStore();
    boardStore.eventSource.addEventListener("StatusChange" + board.id, async function (event) {
        let newStatus = JSON.parse(event.data);
        await handleStatusChange(newStatus);
    })
}

async function initPositionChange(board) {
    const boardStore = useBoardStore();
    boardStore.eventSource.addEventListener("PositionChange" + board.id, async function (event) {
        let newStatus = JSON.parse(event.data);
        await handlePositionChange(newStatus);
    })
}

function initRollChange(board) {
    const boardStore = useBoardStore();
    boardStore.eventSource.addEventListener("RollChange" + board.id, function (event) {
        let newStatus = JSON.parse(event.data);
        handleRollChange(newStatus);
    })
}
export { initPlayerChange, initStatusChange, initPositionChange, initRollChange };

