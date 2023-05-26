// Constants
const ROW_COUNT = 6;
const COLUMN_COUNT = 7;
const EMPTY = 0;
const PLAYER_ONE = 1;
const PLAYER_TWO = 2;

const PLAYER_ONE_NAME = 'Player One';
const PLAYER_TWO_NAME = 'Player Two';


// Game state
let currentPlayer = PLAYER_ONE;

let board = [];

const currentPlayerDisplay = document.getElementById('current-player');
updateCurrentPlayerDisplay();

// Create the game board
const boardContainer = document.getElementById('board');
for (let row = 0; row < ROW_COUNT; row++) {
    const rowElement = document.createElement('div');
    rowElement.classList.add('flex', 'flex-row');
    boardContainer.appendChild(rowElement);

    const rowArray = [];
    for (let col = 0; col < COLUMN_COUNT; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        rowElement.appendChild(cell);

        cell.addEventListener('click', () => handleMove(col));
        rowArray.push(EMPTY);
    }

    board.push(rowArray);
}

// Handle a move
function handleMove(column) {
    if (isColumnFull(column)) {
        alert('Column is full. Please choose another column.');
        return;
    }

    const row = getAvailableRow(column);
    board[row][column] = currentPlayer;

    // Update cell color
    const cell = boardContainer.children[ROW_COUNT - 1 - row].children[column];
    cell.classList.add(currentPlayer === PLAYER_ONE ? 'bg-red-500' : 'bg-yellow-500');

    if (isWinningMove(row, column)) {
        setTimeout(() => {
            alert(`Player ${currentPlayer} wins!`);
            resetGame();
        }, 100);
    } else if (isBoardFull()) {
        setTimeout(() => {
            alert("It's a draw!");
            resetGame();
        }, 100);
    } else {
        currentPlayer = currentPlayer === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;
        updateCurrentPlayerDisplay();
    }
}

// Get the available row for a move
function getAvailableRow(column) {
    for (let row = 0; row < ROW_COUNT; row++) {
        if (board[row][column] === EMPTY) {
            return row;
        }
    }
    return -1;
}

// Check if the column is full
function isColumnFull(column) {
    return board[ROW_COUNT - 1][column] !== EMPTY;
}

// Check if the move is a winning move
function isWinningMove(row, column) {
    const directions = [
        [1, 0], // Horizontal
        [0, 1], // Vertical
        [1, 1], // Diagonal \
        [-1, 1] // Diagonal /
    ];

    for (const [dx, dy] of directions) {
        let count = 1;
        count += countDirection(row, column, dx, dy);
        count += countDirection(row, column, -dx, -dy);

        if (count >= 4) {
            return true;
        }
    }

    return false;
}

// Count consecutive cells in a specific direction
function countDirection(row, column, dx, dy) {
    const player = board[row][column];
    let count = 0;

    let newRow = row + dx;
    let newCol = column + dy;

    while (newRow >= 0 && newRow < ROW_COUNT && newCol >= 0 && newCol < COLUMN_COUNT && board[newRow][newCol] === player) {
        count++;
        newRow += dx;
        newCol += dy;
    }

    return count;
}

// Check if the board is full
function isBoardFull() {
    for (let row = 0; row < ROW_COUNT; row++) {
        for (let col = 0; col < COLUMN_COUNT; col++) {
            if (board[row][col] === EMPTY) {
                return false;
            }
        }
    }
    return true;
}

// Reset the game
function resetGame() {
    currentPlayer = PLAYER_ONE;
    board = [];

    // Clear board elements
    while (boardContainer.firstChild) {
        boardContainer.firstChild.remove();
    }

    // Re-create the game board
    for (let row = 0; row < ROW_COUNT; row++) {
        const rowElement = document.createElement('div');
        rowElement.classList.add('flex', 'flex-row');
        boardContainer.appendChild(rowElement);

        const rowArray = [];
        for (let col = 0; col < COLUMN_COUNT; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            rowElement.appendChild(cell);

            cell.addEventListener('click', () => handleMove(col));
            rowArray.push(EMPTY);
        }

        board.push(rowArray);
    }
}


// Update the current player display
function updateCurrentPlayerDisplay() {
    currentPlayerDisplay.textContent = currentPlayer === PLAYER_ONE ? PLAYER_ONE_NAME : PLAYER_TWO_NAME;
  }
  