import { useBoardStore } from "src/store/boardStore";
import { useGamePlayStore } from "src/store/gameplayStore";

async function robotStep() {
    const boardStore = useBoardStore();
    const gamePlayStore = useGamePlayStore();
    await new Promise(resolve => setTimeout(resolve, 800));
    if (gamePlayStore.playingBoard.status !== 'FINISHED' && gamePlayStore.robotEnabled && boardStore.joinedPlayer.some(p => p.id === gamePlayStore.currentPlayer.id)) {
       const res =  await gamePlayStore.rollDice(boardStore.startedBoard.id, { playerId: gamePlayStore.currentPlayer.id });
       console.log(gamePlayStore.thrownNumber) 
       gamePlayStore.executeRobotStrategy();
       await gamePlayStore.movePlayer(boardStore.startedBoard.id, { pieceId: gamePlayStore.selectedPiece?.id, playerId: gamePlayStore.currentPlayer.id, token: gamePlayStore.rollResponse.token });
    }
}

export { robotStep };


