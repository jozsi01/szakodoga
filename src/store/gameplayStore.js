import { defineStore } from "pinia";
import gameplayStoreApi from "./gameplayStoreApi.js";

export const useGamePlayStore = defineStore('gamePlayStore', {

    state: () => {
        return {
            rollResponse: {}, errorOccured: false, errorMessage: "", thrownNumber: 0,
            currentPlayer: {}, disableRollButton: false, players: [], playingBoard: {},
            selectedPiece: {}, robotEnabled: false, robotStrategy: null
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
                //this.playingBoard = updatedBoard;
                if (this.playingBoard.nextPlayerId) {
                    this.currentPlayer = updatedBoard.players.find(p => p.id === updatedBoard.nextPlayerId);
                }
            }
            catch (error) {
                console.log(error.response);
            }
        },
        executeRobotStrategy() {
            this.robotStrategy();
        },
        setRobotStartegyToIntermidiate() {
            this.robotStrategy = this.intermidiateRobotStrategy;
        },
        setRobotStartegyToBeginner() {
            this.robotStrategy = () => { };
        },
        setRobotStartegyToAdvanced() {
            this.robotStrategy = this.advancedRobotStrategy;
        },
        intermidiateRobotStrategy() {
            if (this.thrownNumber == 6) {
                for (let i = this.currentPlayer.pieces.length - 1; i >= 0; i--) {
                    if (this.currentPlayer.pieces[i].positionOnTheBoard == -1 && !this.currentPlayer.pieces[i].gotAround) {
                        this.selectedPiece = this.currentPlayer.pieces[i];
                        i = 0;
                    }
                }
            }
        },
        advancedRobotStrategy() {
            const otherPlayers = this.playingBoard.players.filter(p => p.id != this.currentPlayer.id);
            console.log(otherPlayers);
            let findAKnockingPiece = false;
            this.currentPlayer.pieces.forEach(piece => {
                if (piece.positionOnTheBoard >= 0) {
                    otherPlayers.forEach(otherPlayer => {
                        if (otherPlayer.pieces.find(p => p.positionOnTheBoard == piece.positionOnTheBoard + this.thrownNumber)) {
                            findAKnockingPiece = true;
                            this.selectedPiece = piece;
                        }
                    })
                }
            });
            if (!findAKnockingPiece) {
                this.intermidiateRobotStrategy();
            }
        }
    }
})