import axios from "axios";

async function getBoards() {
    return (await axios.get('http://localhost:8080/board')).data;
}

async function getBoard(id) {
    return (await axios.get('http://localhost:8080/board/' + id)).data
}
async function deleteBoard(boardId) {
    await axios({
        method: 'delete',
        url: "http://localhost:8080/board/" + boardId,
    });
}
async function createBoard(board) {
    return (await axios.post('http://localhost:8080/board', board)).data;
}
async function startBoard(boardId) {
    return (await axios.put('http://localhost:8080/board/manage/' + boardId + '/start')).data
}
async function resetBoard(boardId) {
    return (await axios.put('http://localhost:8080/board/manage/' + boardId + '/reset')).data;
}

async function stopBoard(boardId) {
    return (await axios.put('http://localhost:8080/board/manage/' + boardId + '/stop')).data;
}

async function getColors() {
    return (await axios.get('http://localhost:8080/board/manage/supported-colors')).data.colors;
}

async function joinPlayer(boardId, player) {
    return (await axios.post('http://localhost:8080/board/' + boardId + '/join', player)).data;
}

async function leavePlayer(boardId, player) {
    return (await axios.post('http://localhost:8080/board/' + boardId + '/leave', player)).data;
}

export default { getBoards, getBoard, deleteBoard, createBoard, startBoard, resetBoard, stopBoard, getColors, joinPlayer, leavePlayer };