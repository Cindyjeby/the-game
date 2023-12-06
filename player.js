let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

let player1Wins = 0;
let player1Loses = 0;
let player1Draws = 0;

let player2Wins = 0;
let player2Loses = 0;
let player2Draws = 0;

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e) {
    const id = e.target.id

    if(!spaces[id]){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if(playerHasWon() !==false){
            playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()

            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            return
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
    }
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c]
        }
    }
    return false
}

restartBtn.addEventListener('click', restart)

function restart() {
    spaces.fill(null)

    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor=''
    })

    playerText.innerHTML = 'Tic Tac Toe'

    currentPlayer = X_TEXT
}

startGame()

document.getElementById('goBackBtn').addEventListener('click', () => {
    // Redirect back to the choose a player page
    window.location.href = 'choose.html';
});

function declareWinner(who) {
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;

    // Update scores based on the result
    if (who.includes("win")) {
        if (who.includes("Player 1")) {
            player1Wins++;
            player2Loses++;
        } else {
            player2Wins++;
            player1Loses++;
        }
    } else if (who.includes("Tie")) {
        player1Draws++;
        player2Draws++;
    }

    // Update the scores in the table
    document.getElementById("player1Win").innerText = player1Wins;
    document.getElementById("player1Lose").innerText = player1Loses;
    document.getElementById("player1Draw").innerText = player1Draws;

    document.getElementById("player2Win").innerText = player2Wins;
    document.getElementById("player2Lose").innerText = player2Loses;
    document.getElementById("player2Draw").innerText = player2Draws;
}