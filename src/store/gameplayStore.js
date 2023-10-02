import { defineStore } from "pinia";
import gameplayStoreApi from "./gameplayStoreApi.js";

export const useGamePlayStore = defineStore('gamePlayStore', {

    state: () => {
        return {
            rollResponse: {}, errorOccured: false, errorMessage: "", thrownNumber: 0,
            currentPlayer: {}, disableRollButton: false, players: [], playingBoard: {},
            selectedPiece: {}, robotEnabled: false,
        }

    },

    actions: {
        async rollDice(boardId, playerId) {
            try {
                this.rollResponse = await gameplayStoreApi.rollDice(boardId, playerId);
               
            } catch (error) {
                this.errorMessage = error.response.data;
                this.errorOccured = true;
                
            }
        },
        async movePlayer(boardId, moveRequest) {
            try {

                const updatedBoard = await gameplayStoreApi.movePlayer(boardId, moveRequest);
                this.disableRollButton = false;
                this.playingBoard = updatedBoard;
                if (this.playingBoard.nextPlayerId) {
                    this.currentPlayer = updatedBoard.players.find(p => p.id === updatedBoard.nextPlayerId);
                }
            }
            catch (error) {
                console.log(error.response);
            }
        }
    }
})