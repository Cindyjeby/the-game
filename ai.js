var origBoard;

//test code
let playerWins = 0;
let playerLoses = 0;
let playerDraws = 0;

let aiWins = 0;
let aiLoses = 0;
let aiDraws = 0;

const huPlayer = 'O';
const aiPlayer = 'X';
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]
const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
    document.querySelector(".endgame").style.display = "none";
    origBoard = Array.from(Array(9).keys());
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false)
    }
}

function turnClick(square) {
    if (typeof origBoard[square.target.id] == 'number') {
        turn(square.target.id, huPlayer)
        if (!checkWin(origBoard, huPlayer) && !checkTie()) turn(bestSpot(), aiPlayer);
    }
}
function turn(squareId, player) {
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(origBoard, player)
    if (gameWon) gameOver(gameWon)
}

function checkWin(board, player) {
    let plays = board.reduce((a, e, i) =>
    (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winCombos.entries()){
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = {index: index, player: player};
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon) {
    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor = gameWon.player == huPlayer ? "blue" : "red";
    }
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner(gameWon.player == huPlayer ? "You win!" : "You lose.");
}

/*Basic Ai and winner box*/
function declareWinner(who) {
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;
    //test code
    if (who.includes("win")) {
        if (who.includes("You")) {
            playerWins++;
            aiLoses++;
        } else {
            aiWins++;
            playerLoses++;
        }
    } else if (who.includes("Tie")) {
        playerDraws++;
        aiDraws++;
    }
    // Update the scores in the table
    document.getElementById("playerWin").innerText = playerWins;
    document.getElementById("playerLose").innerText = playerLoses;
    document.getElementById("playerDraw").innerText = playerDraws;

    document.getElementById("aiWin").innerText = aiWins;
    document.getElementById("aiLose").innerText = aiLoses;
    document.getElementById("aiDraw").innerText = aiDraws;
}

function emptySquares() {
    return origBoard.filter(s => typeof s == 'number');
}
function bestSpot() {
    return minimax(origBoard, aiPlayer).index;
}
function checkTie() {
    if (emptySquares().length == 0) {
        for (var i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = "green";
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner("Tie Game!")
        return true;
    }
    return false;
}

/* hard level */
function minimax(newBoard, player) {
    var availSpots = emptySquares();

    if (checkWin(newBoard, huPlayer)) {
        return {score: -10};
    } else if (checkWin(newBoard, aiPlayer)) {
        return {score: 10};
    } else if (availSpots.length === 0) {
        return {score: 0};
    }
    var moves = [];
    for (var i = 0; i < availSpots.length; i++) {
        var move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;

        if (player == aiPlayer) {
            var result = minimax(newBoard, huPlayer);
            move.score = result.score;
        } else {
            var result = minimax(newBoard, huPlayer);
            move.score = result.score;
        }
        newBoard[availSpots[i]] = move.index;
        
        moves.push(move);
    }
    var bestMove;
    if(player === aiPlayer) {
        var bestScore = -10000;
        for(var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = 10000;
        for(var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    return moves[bestMove];
}

document.getElementById('goBackBtn').addEventListener('click', () => {
    // Redirect back to the choose a player page
    window.location.href = 'choose.html';
});

document.getElementById('restartBtn').addEventListener('click', startGame);