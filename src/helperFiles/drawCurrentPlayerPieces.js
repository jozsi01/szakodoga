import { convert } from 'src/components/ColorNameToHex';
import Konva from 'konva';
import { useGamePlayStore } from 'src/store/gameplayStore';
import { faChessPawn } from '@fortawesome/free-solid-svg-icons';

function drawPieces(currentPlayer) {
    const gamePlayStore = useGamePlayStore();
    const numberOfPieces =(currentPlayer.pieces.filter(p => p.positionOnTheBoard === -1 && !p.gotAround )).length
    let width;
    if (numberOfPieces === 1) {
        width = numberOfPieces * 40;
    }
    else width = numberOfPieces * 30;
    var stage = new Konva.Stage({
        container: currentPlayer.id,
        width: width,
        height: 50
    })
    var layer = new Konva.Layer();
    let xOffset = 20;
    let i = 0;
    currentPlayer.pieces.forEach(piece => {
        var pieceIcon = new Konva.Path({
            x: xOffset,
            y: 0,
            data: faChessPawn.icon[4],
            fill: convert(currentPlayer.color),
            scaleX: 0.07,
            scaleY: 0.07,
            id: piece.id
          });
        if (i === numberOfPieces - 1) {
            pieceIcon.on('mousedown', function () {
                gamePlayStore.selectedPiece = currentPlayer.pieces.find(p=>p.positionOnTheBoard === -1 && !p.gotAround);
                console.log(gamePlayStore.selectedPiece);
                pieceIcon.stroke('black');
                pieceIcon.strokeWidth(10);
            })
        }
        i++;
        xOffset += 20;
        layer.add(pieceIcon);
    });
    stage.add(layer)
    layer.draw();

}



export {drawPieces};