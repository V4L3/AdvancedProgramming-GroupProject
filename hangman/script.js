// Hangman Game Logic
const wordDisplay = document.getElementById('word-display');
const guessesLeft = document.getElementById('guesses');
const lettersGuessed = document.getElementById('guessed');
const letterInput = document.getElementById('letter-input');
const guessButton = document.getElementById('guess-button');
const resultMessage = document.getElementById('result-message');
const hangmanStage = document.getElementById('hangman-stage');

// Set up the initial game state
let words = ["javascript", "html", "css", "react", "node", "hangman"];
let word = words[Math.floor(Math.random() * words.length)]; // Choose a random word from words
let guessedLetters = [];
let guessesRemaining = 6;
let currentStage = 0;

// Initialize the word display
let hiddenWord = '_'.repeat(word.length);
wordDisplay.textContent = hiddenWord;

// Hangman stages (reversed order)
const stages = [
  `
  +---+
  |   |
      |
      |
      |
      |
=========
  `,
  `
  +---+
  |   |
  O   |
      |
      |
      |
=========
  `,
  `
  +---+
  |   |
  O   |
  |   |
      |
      |
=========
  `,
  `
  +---+
  |   |
  O   |
  |\\  |
      |
      |
=========
  `,
  `
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========
  `,
  `
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========
  `,
  `
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========
  `
];

// Update the game display
function updateDisplay() {
  guessesLeft.textContent = guessesRemaining;
  lettersGuessed.textContent = guessedLetters.join(', ');
  wordDisplay.textContent = hiddenWord;
  hangmanStage.querySelector('pre').innerHTML = stages[currentStage];
}

// Check if the guessed letter is correct
function checkGuess(letter) {
  if (guessedLetters.includes(letter)) {
    resultMessage.textContent = 'You already guessed that letter!';
    return;
  }

  guessedLetters.push(letter);

  if (word.includes(letter)) {
    let newHiddenWord = '';
    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter) {
        newHiddenWord += letter;
      } else {
        newHiddenWord += hiddenWord[i];
      }
    }
    hiddenWord = newHiddenWord;
    resultMessage.textContent = 'Correct guess!';
  } else {
    guessesRemaining--;
    resultMessage.textContent = 'Wrong guess!';
    currentStage++;
  }

  updateDisplay();

  // Check if the game is over
  if (hiddenWord === word) {
    resultMessage.textContent = 'Congratulations! You guessed the word!';
    guessButton.disabled = true;
  } else if (guessesRemaining === 0) {
    resultMessage.textContent = 'Game over! You ran out of guesses.';
    guessButton.disabled = true;
  }
}

// Handle guess button click event
guessButton.addEventListener('click', function () {
  const letter = letterInput.value.toLowerCase();
  if (letter.match(/[a-z]/i)) {
    checkGuess(letter);
  } else {
    resultMessage.textContent = 'Invalid guess! Please enter a letter from A to Z.';
  }

  // Clear the input field
  letterInput.value = '';
})

// Reset button
const resetButton = document.getElementById('reset-button');

// Reset the game
function resetGame() {
  // Reset game state
  word = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  guessesRemaining = 6;
  currentStage = 0;
  hiddenWord = '_'.repeat(word.length);

  // Reset UI display
  updateDisplay();
  resultMessage.textContent = ' ';
  guessButton.disabled = false;
}

// Handle reset button click event
resetButton.addEventListener('click', resetGame);

// Update the display initially
updateDisplay();
