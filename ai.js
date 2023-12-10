var origBoard;

// Scores
let playerWins = 0;
let playerLoses = 0;
let playerDraws = 0;

let aiWins = 0;
let aiLoses = 0;
let aiDraws = 0;

// Players
const huPlayer = 'O';
const aiPlayer = 'X';

// Winning combinations
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
];

// Selecting all cells
const cells = document.querySelectorAll('.cell');

// Function to start the game
function startGame() {
    document.querySelector(".endgame").style.display = "none";
    origBoard = Array.from(Array(9).keys());
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }
}

// Function to handle user's move
function turnClick(square) {
    if (typeof origBoard[square.target.id] == 'number') {
        turn(square.target.id, huPlayer);
        if (!checkWin(origBoard, huPlayer) && !checkTie()) turn(bestSpot(), aiPlayer);
    }
}

// Function to handle a player's move
function turn(squareId, player) {
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(origBoard, player);
    if (gameWon) gameOver(gameWon);
}

// Function to check if a player has won
function checkWin(board, player) {
    let plays = board.reduce((a, e, i) =>
    (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = { index: index, player: player };
            break;
        }
    }
    return gameWon;
}

// Function to handle the end of the game
function gameOver(gameWon) {
    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor = gameWon.player == huPlayer ? "blue" : "red";
    }
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner(gameWon.player == huPlayer ? "You win!" : "You lose.");
}

// Function to declare the winner and update scores
function declareWinner(who) {
  document.querySelector(".endgame").style.display = "block";
  document.querySelector(".endgame .text").innerText = who;

  // Update scores based on the winner
  if (who.includes("win")) {
    if (who.includes("You")) {
      playerWins++;
    } else {
      aiWins++;
      playerLoses++; // Update opponent's score simultaneously
    }
  } else if (who.includes("lose")) {
    playerLoses++;
    aiWins++; // Update opponent's score simultaneously
  } else if (who.includes("Tie")) {
    playerDraws++;
    aiDraws++;
  }
  
    // Pass updated scores to updateScoreboard
    updateScoreboard(playerWins, playerLoses, playerDraws, aiWins, aiLoses, aiDraws);
  }

// Function to update the scoreboard
function updateScoreboard(playerWin, playerLose, playerDraw, aiWin, aiLose, aiDraw) {
    document.getElementById("playerWin").innerText = playerWins;
    document.getElementById("playerLose").innerText = playerLoses;
    document.getElementById("playerDraw").innerText = playerDraws;

    document.getElementById("aiWin").innerText = aiWins;
    document.getElementById("aiLose").innerText = aiLoses;
    document.getElementById("aiDraw").innerText = aiDraws;
}

// Function to check for a tie
function checkTie() {
    if (emptySquares().length == 0) {
        for (var i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = "green";
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner("Tie Game!");
        return true;
    }
    return false;
}

// Function to find empty squares
function emptySquares() {
    return origBoard.filter(s => typeof s == 'number');
}

// Function to find the best move for the AI
function bestSpot() {
    return minimax(origBoard, aiPlayer).index;
}

// Function to perform the minimax algorithm
function minimax(newBoard, player) {
    var availSpots = emptySquares();

    if (checkWin(newBoard, huPlayer)) {
        return { score: -10 };
    } else if (checkWin(newBoard, aiPlayer)) {
        return { score: 10 };
    } else if (availSpots.length === 0) {
        return { score: 0 };
    }

    var moves = [];
    for (var i = 0; i < availSpots.length; i++) {
        var move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;

        if (player == aiPlayer) {
            move.score = minimax(newBoard, huPlayer).score;
        } else {
            move.score = minimax(newBoard, aiPlayer).score;
        }
        newBoard[availSpots[i]] = move.index;

        moves.push(move);
    }

    var bestMove;
    if (player === aiPlayer) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    return moves[bestMove];
}

// Event listener for the "Go Back" button
document.getElementById('goBackBtn').addEventListener('click', () => {
    // Redirect back to the choose a player page
    window.location.href = 'choose.html';
});

// Event listener for the "Restart" button
document.getElementById('restartBtn').addEventListener('click', startGame);

// Initial game setup
startGame();