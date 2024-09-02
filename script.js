// script.js
const board = document.getElementById('board');
const status = document.getElementById('status');
const cells = Array.from(document.getElementsByClassName('cell'));
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let boardState = Array(9).fill(null);

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]  // Diagonals
];

function checkWinner() {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a];
        }
    }
    return boardState.includes(null) ? null : 'Tie';
}

function updateStatus() {
    const winner = checkWinner();
    if (winner) {
        if (winner === 'Tie') {
            status.textContent = "It's a Tie!";
        } else {
            status.textContent = `Player ${winner} Wins!`;
        }
    } else {
        status.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function handleClick(e) {
    const index = e.target.dataset.index;
    if (!boardState[index] && !checkWinner()) {
        boardState[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus();
    }
}

function resetGame() {
    boardState.fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    updateStatus();
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);

// Initialize the game
updateStatus();
