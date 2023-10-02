import { defineStore } from "pinia";
import axios from "axios";
import { nextTick } from "vue";
import boardStoreApi from "./boardStoreApi.js";


export const useBoardStore = defineStore('boardStore', {
    state: () => {
        return {
            boards: [],
            colors: [],
            eventSource: {},
            startedBoard: {},
            joinedPlayer: [],
            gameEnded: false
        }
    },

    actions: {
        changeRoute(router, path) {
            router.push(path);
        },

        async getBoards() {
            try {
                const resp = await boardStoreApi.getBoards();
               
                this.boards = resp.boards;
            } catch (error) {
               
                this.errorMessage = error.response;
                this.errorOccured = true;
            }
        },

        async getBoard(id) {
            try {
                const board = await boardStoreApi.getBoard(id);
                return board;
            } catch (error) {
                this.errorMessage = error.response.data;
                this.errorOccured = true;
            }

        },
        async deleteBoard(boardId) {
            try {
                await boardStoreApi.deleteBoard(boardId);
                this.boards = (await boardStoreApi.getBoards()).boards;
            } catch (error) {
              
                this.errorMessage = error.response.data;
                this.errorOccured = true;
            }

        },

        async createBoard(board) {
            try {
                const createdBoard = await boardStoreApi.createBoard(board);
                
                this.boards.push(createdBoard);
            } catch (error) {
                this.errorMessage = error.response.data;
                this.errorOccured = true;
            }

        },
        async startBoard(boardId) {
            try {

                const startedBoard = await boardStoreApi.startBoard(boardId);
                let board = this.boards.find(b => b.id === startedBoard.id);
                let index = this.boards.indexOf(board);
                this.boards.splice(index, 1, startedBoard);
                this.startedBoard = startedBoard;
                return startedBoard;
            }
            catch (error) {
                this.errorMessage = error.response.data;
                this.errorOccured = true;
            }
        },
        async resetBoard(boardId) {
            console.log("resetBoardba belepett");
            try {
                const resetedBoard = await boardStoreApi.resetBoard(boardId);
                let board = this.boards.find(b => b.id === boardId);
                let index = this.boards.indexOf(board);
                this.boards.splice(index, 1, resetedBoard);
                resetedBoard.players = [];

            }
            catch (error) {
                this.errorMessage = error.response.data;
                this.errorOccured = true;
            }

        },

        async stopBoard(boardId) {
            try {
                const stoppedBoard = await boardStoreApi.stopBoard(boardId);
                let board = this.boards.find(b => b.id === stoppedBoard.id);
                let index = this.boards.indexOf(board);
                this.boards.splice(index, 1, stoppedBoard);
            }
            catch (error) {
                this.errorMessage = error.response.data;
                this.errorOccured = true;
            }

        },


        async getColors() {
            try {
                this.colors = await boardStoreApi.getColors();
            }
            catch (error) {
                this.errorMessage = error.response.data;
                this.errorOccured = true;
            }

        },

        async joinPlayer(boardId, player) {
            try {
                const joinedPlayer = await boardStoreApi.joinPlayer(boardId, player);
                let board = this.boards.find(b => b.id === boardId);

                this.joinedPlayer.push(joinedPlayer);



            }
            catch (error) {
                this.errorMessage = error.response.data;
                this.errorOccured = true;
            }


        },

        async leavePlayer(boardId, player) {
            try {
                let leftBoard = await boardStoreApi.leavePlayer(boardId, player);
                let board = this.boards.find(b => b.id === leftBoard.id);
                let index = this.boards.indexOf(board);
                this.boards.splice(index, 1, leftBoard);
            }
            catch (error) {
                this.errorMessage = error.response.data;
                this.errorOccured = true;
            }

        },







    }
})