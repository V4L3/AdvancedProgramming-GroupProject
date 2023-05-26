// Initialize variables
let currentPlayer = "x";
let gameBoard = document.querySelector(".board");
let squares = document.querySelectorAll(".square");
let currentPlayerElement = document.getElementById("current-player");
let gameStatusElement = document.getElementById("game-status");
let newGameButton = document.getElementById("new-game-button");


// Loop through each square and add a click event listener
squares.forEach((square) => {
  square.addEventListener("click", () => {
    // If the square is already filled, do nothing
    if (square?.classList.contains("x") || square?.classList.contains("o")) {
      return;
    }

    // Add the current player's symbol to the square
    square.classList.add(currentPlayer);

    // Update current player display
    currentPlayerElement.textContent = currentPlayer.toUpperCase();

    // Check for a win or tie
    squares = document.querySelectorAll(".square");
    if (checkWin()) {
      gameStatusElement.textContent = `${currentPlayer} wins!`;
      disableClicks();
    } else if (checkTie()) {
      gameStatusElement.textContent = "Tie game!";
      disableClicks();
    } else {
      // Switch to the other player's turn
      currentPlayer = currentPlayer === "x" ? "o" : "x";
    }
  });
});

// Handle new game button click event
newGameButton.addEventListener("click", () => {
  resetGame();
});

function disableClicks(){
  newGameButton.style.display = "block";
}

// Check for a win by comparing each possible winning combination
function checkWin() {
  const winCombos = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  let winningCombinationExists = false;
  winCombos.forEach((combo) => {
    if (!winningCombinationExists) {
      winningCombinationExists =
        squares[combo[0] - 1].classList.contains(currentPlayer) &&
        squares[combo[1] - 1].classList.contains(currentPlayer) &&
        squares[combo[2] - 1].classList.contains(currentPlayer);
    }
  });
  return winningCombinationExists;
}

// Check for a tie by checking if all squares are filled
function checkTie() {
  return Array.from(squares).every((square) => {
    return square.classList.contains("x") || square.classList.contains("o");
  });
}

// Reset the game by removing all symbols from the board
function resetGame() {
  squares.forEach((square) => {
    square.classList.remove("x");
    square.classList.remove("o");
  });

  // Set the current player back to "x"
  currentPlayer = "x";

  // Update current player display
  currentPlayerElement.textContent = currentPlayer.toUpperCase();

  // Clear game status
  gameStatusElement.textContent = "";

  newGameButton.style.display = "none";
}
