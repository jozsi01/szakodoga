import axios from "axios";

async function rollDice(boardId,playerId) {
    return (await axios.post('http://localhost:8080/board/'+boardId+'/roll-a-dice',playerId)).data;
}
async function movePlayer(boardId,moveRequest) {
    return (await axios.post('http://localhost:8080/board/'+boardId+'/move',moveRequest)).data;
}

export default {rollDice, movePlayer};