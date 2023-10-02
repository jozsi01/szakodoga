import Konva from "konva";
import { convert } from "src/components/ColorNameToHex";
import { useGamePlayStore } from "src/store/gameplayStore";

function setUpBoardWithMorePlayer(board,_containerWidth,_containerHeight) {
    const gamePlayStore = useGamePlayStore();
    const numberOfFields = ((board.distanceBetweenPlayers - 1) * board.players.length) + board.players.length;
    const degreeOffset = 360 / board.players.length;
    const containerWidth = document.getElementById("container").offsetWidth;
    const containerHeight = document.getElementById("container").offsetHeight;
    var stage = new Konva.Stage({
        container: 'board',
        width: containerWidth,
        height: containerHeight
    });
    var startingPointCoordinates = [];
    const boardGameradius = (containerHeight / 2) - 80;
    var layer = new Konva.Layer();
    let rotationalDegree = degreeOffset;
    let id = 0;

    for (let i = 0; i < board.players.length; i++) {
        let angleInRadian = (rotationalDegree * Math.PI) / 180;
        var circle = new Konva.Circle({
            x: stage.width() / 2 + (Math.sin(angleInRadian) * boardGameradius),
            y: stage.height() / 2 + (Math.cos(angleInRadian) * boardGameradius),
            radius: 500 / numberOfFields,
            fill: 'white',
            stroke: convert(board.players[i].color),
            id: id.toString(),
            strokeWidth: 4
        });

        (function (caputerCircle) {
            caputerCircle.on("mousedown", function () {
                for (let i = 0; i < gamePlayStore.currentPlayer.pieces.length; i++) {
                    const id = caputerCircle.id();
                    const piece = gamePlayStore.currentPlayer.pieces[i].positionOnTheBoard;
                    if (id == piece) {
                        
                        gamePlayStore.selectedPiece = gamePlayStore.currentPlayer.pieces[i];
                    }
                }
                const piece = gamePlayStore.currentPlayer.pieces.find(p => p.positionOnTheBoard == caputerCircle.id());
                if (piece) gamePlayStore.selectedPiece = piece;
            });
        })(circle);
        layer.add(circle);
        id += board.distanceBetweenPlayers;
        startingPointCoordinates.push({ x: circle.x(), y: circle.y() });
        rotationalDegree += degreeOffset;

    }
    id = 0;
    for (let i = 0; i < startingPointCoordinates.length; i++) {
        let xOffset;
        let yOffset;
        if (i === startingPointCoordinates.length - 1) {
            xOffset = (startingPointCoordinates[0].x - startingPointCoordinates[i].x) / (board.distanceBetweenPlayers);
            yOffset = (startingPointCoordinates[0].y - startingPointCoordinates[i].y) / (board.distanceBetweenPlayers);
        }
        else {
            xOffset = (startingPointCoordinates[i + 1].x - startingPointCoordinates[i].x) / (board.distanceBetweenPlayers);
            yOffset = (startingPointCoordinates[i + 1].y - startingPointCoordinates[i].y) / (board.distanceBetweenPlayers);
        }

        let currentX = startingPointCoordinates[i].x + xOffset;
        let currentY = startingPointCoordinates[i].y + yOffset;
        id++;
        for (let q = 0; q < board.distanceBetweenPlayers - 1; q++) {

            var circle = new Konva.Circle({
                x: currentX,
                y: currentY,
                radius: 500 / numberOfFields,
                fill: 'white',
                id: id.toString(),
                stroke: 'black',
                strokeWidth: 1
            });
            (function (caputerCircle) {
                caputerCircle.on("mousedown", function () {
                    const piece = gamePlayStore.currentPlayer.pieces.find(p => p.positionOnTheBoard == caputerCircle.id());
                    if (piece) gamePlayStore.selectedPiece = piece;

                });
            })(circle);

            currentX += xOffset;
            currentY += yOffset;
            id++;
            layer.add(circle);

        }


    }

    stage.add(layer);
    layer.draw();
    return stage;
}

function setUpBoardWith2Player(board,_containerWidth,_containerHeight) {
    const gamePlayStore = useGamePlayStore();
    const numberOfFields = board.distanceBetweenPlayers * board.players.length;
    const containerWidth =_containerWidth;
    const containerHeight =_containerHeight;
    var stage = new Konva.Stage({
        container: 'board',
        width: containerWidth,
        height: containerHeight
    });
    const boardGameradius = (600 / 2) - 50;
    var layer = new Konva.Layer();
    const angleOffset = 360 / numberOfFields;
    let id = 0;
    let a = 0;
    for (let i = 0; i < 360; i = i += angleOffset) {
        const angleInRadian = (i * Math.PI) / 180;
        let color = 'black'
        let stroke = 1;
        if (i % 180 == 0) {
            color = convert(board.players[a].color);
            stroke = 4;
            a++;
        }


        let circle = new Konva.Circle({
            x: stage.width() / 2 + (Math.sin(angleInRadian) * boardGameradius),
            y: stage.height() / 2 + (Math.cos(angleInRadian) * boardGameradius),
            radius: (200 / numberOfFields),
            fill: 'white',
            id: id.toString(),
            stroke: color,
            strokeWidth: stroke
        });
     

        (function (caputerCircle) {
            caputerCircle.on("mousedown", function () {
                
                const piece = gamePlayStore.currentPlayer.pieces.find(p => p.positionOnTheBoard == caputerCircle.id());
                if (piece) gamePlayStore.selectedPiece = piece;
                console.log(gamePlayStore.selectedPiece);

            });
        })(circle);


        id++;

        layer.add(circle);
    }


    stage.add(layer);
    layer.draw();
    return stage;
}

export{setUpBoardWith2Player,setUpBoardWithMorePlayer}