// Hangman Game Logic
const wordDisplay = document.getElementById('word-display');
const guessesLeft = document.getElementById('guesses');
const lettersGuessed = document.getElementById('guessed');
const letterInput = document.getElementById('letter-input');
const guessButton = document.getElementById('guess-button');
const resultMessage = document.getElementById('result-message');

// Set up the initial game state
let words = ["javascript", "html", "css", "react", "node", "hangman"];
let word = words[Math.floor(Math.random() * words.length)]; // Choos a random word from words
let guessedLetters = [];
let guessesRemaining = 6;

// Initialize the word display
let hiddenWord = '_'.repeat(word.length);
wordDisplay.textContent = hiddenWord;

// Update the game display
function updateDisplay() {
  guessesLeft.textContent = guessesRemaining;
  lettersGuessed.textContent = guessedLetters.join(', ');
  wordDisplay.textContent = hiddenWord;
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
guessButton.addEventListener('click', function() {
  const letter = letterInput.value.toLowerCase();
  if (letter.match(/[a-z]/i)) {
    checkGuess(letter);
  } else {
    resultMessage.textContent = 'Invalid guess! Please enter a letter from A to Z.';
  }
  
  // Clear the input field
  letterInput.value = '';
});

// Update the display initially
updateDisplay();
