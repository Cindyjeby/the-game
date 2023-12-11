var origBoard;

// Scores
let player1Wins = 0;
let player1Loses = 0;
let player1Draws = 0;

let player2Wins = 0;
let player2Loses = 0;
let player2Draws = 0;

// Players
const player1 = 'X';
const player2 = 'O';

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
const cells = document.querySelectorAll('.box');

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
        let currentPlayer = (origBoard.filter(s => typeof s == 'number').length % 2 === 0) ? player2 : player1;
        turn(square.target.id, currentPlayer);
        if (!checkWin(origBoard, currentPlayer) && !checkTie()) {
            let nextPlayer = (currentPlayer === player1) ? player2 : player1;
            displayNextPlayer(nextPlayer);
        }
    }
}

// Function to handle a player's move
function turn(squareId, currentPlayer) {
    origBoard[squareId] = currentPlayer;
    document.getElementById(squareId).innerText = currentPlayer;
    let gameWon = checkWin(origBoard, currentPlayer);
    if (gameWon) gameOver(gameWon);
}

// Function to check if a player has won
function checkWin(board, currentPlayer) {
    let plays = board.reduce((a, e, i) =>
    (e === currentPlayer) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = { index: index, player: currentPlayer };
            break;
        }
    }
    return gameWon;
}

// Function to handle the end of the game
function gameOver(gameWon) {
    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor = gameWon.player == player1 ? "blue" : "red";
    }
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner(gameWon.player == player1 ? "Player 1 wins!" : "Player 2 wins.");
}

// Function to declare the winner and update scores
function declareWinner(who) {
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;

    // Update scores based on the winner
    if (who.includes("Player 1 wins")) {
        player1Wins++;
        player2Loses++; // Update opponent's score simultaneously
    } else if (who.includes("Player 2 wins")) {
        player2Wins++;
        player1Loses++; // Update opponent's score simultaneously
    } else if (who.includes("Tie Game")) {
        player1Draws++;
        player2Draws++;
    }

    // Pass updated scores to updateScoreboard
    updateScoreboard(player1Wins, player1Loses, player1Draws, player2Wins, player2Loses, player2Draws);
}

// Function to update the scoreboard
function updateScoreboard(player1Win, player1Lose, player1Draw, player2Win, player2Lose, player2Draw) {
    document.getElementById("player1Win").innerText = player1Wins;
    document.getElementById("player1Lose").innerText = player1Loses;
    document.getElementById("player1Draw").innerText = player1Draws;

    document.getElementById("player2Win").innerText = player2Wins;
    document.getElementById("player2Lose").innerText = player2Loses;
    document.getElementById("player2Draw").innerText = player2Draws;
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

// Function to display the next player's turn
function displayNextPlayer(player) {
    document.querySelector(".endgame .text").innerText = "Next player: " + player;
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