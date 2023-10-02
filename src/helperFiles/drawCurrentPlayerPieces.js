import { convert } from 'src/components/ColorNameToHex';
import Konva from 'konva';
import { useGamePlayStore } from 'src/store/gameplayStore';


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
    
    for (let i = 0; i < numberOfPieces; i++) {

        var circle = new Konva.Circle({
            x: xOffset,
            y: stage.height() / 2,
            radius: 20,
            fill: convert(currentPlayer.color),
            
            stroke: 'black',
            strokeWidth: 1
        })
        if (i === numberOfPieces - 1) {
            circle.on('mousedown', function () {
                gamePlayStore.selectedPiece = currentPlayer.pieces.find(p=>p.positionOnTheBoard === -1 && !p.gotAround);
                console.log(gamePlayStore.selectedPiece);
            })
        }

        xOffset += 20;
        layer.add(circle);
    }
    stage.add(layer)
    layer.draw();

}
export {drawPieces};