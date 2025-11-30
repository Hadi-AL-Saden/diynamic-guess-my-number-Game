'use strict';

// to control show and hide sections

const hideTheGameSection = hideGame => {
  if (hideGame) {
    document.querySelectorAll('.left, .right, .reset-buttons').forEach(el => {
      el.style.display = 'none';
    });
    document.querySelector('.game-starter').style.display = 'flex';
  } else {
    document.querySelectorAll('.left, .right, .reset-buttons').forEach(el => {
      el.style.display = 'block';
    });
    document.querySelector('.game-starter').style.display = 'none';
  }
};
hideTheGameSection(true);

let displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

//To reset the background color of the body to the default one
let resetGameBackgroundColor = () => {
  document.querySelector('body').style.backgroundColor = '#222';
};

const defaultGuessRange = 20;
// this is var will hold the entered value from the user input
let guessRange = 0;

let secretNumber = 0;
let score = 0;
let highScore = 0;
let currentRangeNumber = 0;

let scoreDisplayMessage = function (scoreMessage) {
  document.querySelector('.score').textContent = scoreMessage;
};

//Clear the guessing input field
let guessInputValue = () => {
  document.querySelector('.guess').value = '';
};

//Selecting the game range number to start the game
document.querySelector('.start').addEventListener('click', () => {
  guessRange = Number(document.querySelector('.guess-range').value);
  score = guessRange < defaultGuessRange ? defaultGuessRange : guessRange;
  scoreDisplayMessage(score);
  //Show the game section and hide range select sections to start the game
  hideTheGameSection(false);

  secretNumber = Math.trunc(Math.random() * score) + 1;
  currentRangeNumber = score;

  // console.log(`user guess range:${guessRange}`);
  // console.log(`score is: ${score}`);
  // console.log(secretNumber);
});

//To check the input value from the user
const numberChecker = function (userGuessingValue) {
  if (!userGuessingValue || userGuessingValue < 0) {
    return displayMessage(
      `Please select a number between 1 & ${currentRangeNumber} first ⛔`
    );
  } else if (userGuessingValue > secretNumber) {
    score--;
    return displayMessage('📈 Too high! ');
  } else if (userGuessingValue < secretNumber) {
    score--;
    return displayMessage('📉 Too low!');
  } else if (userGuessingValue === secretNumber) {
    if (score > highScore) {
      highScore = score;
      document.querySelector('.high-score').textContent = highScore;
    }
    document.querySelector('body').style.backgroundColor = 'green';
    return displayMessage('🏆 You Win! ');
  }
};
//To check if the user win's
const winChecker = function (userGuess) {
  if (score > 0) {
    return numberChecker(userGuess);
  } else {
    document.querySelector('body').style.backgroundColor = 'red';
    return displayMessage('💥 You lost the game!');
  }
};

//when press on check button
document.querySelector('.check').addEventListener('click', () => {
  let numberGuessingValue = Number(document.querySelector('.guess').value);
  winChecker(numberGuessingValue);
  scoreDisplayMessage(score);
  // console.log(typeof numberGuessingValue);
});

document.querySelector('.again-same-range').addEventListener('click', () => {
  secretNumber =
    Math.trunc(
      Math.random() *
        (guessRange === 0 || guessRange < 20 ? currentRangeNumber : guessRange)
    ) + 1;

  score = currentRangeNumber;
  scoreDisplayMessage(score);
  displayMessage('Start guessing...');
  guessInputValue();
  resetGameBackgroundColor();
  // console.log(`new secret number${secretNumber}`);
});

document.querySelector('.again-new-range').addEventListener('click', () => {
  displayMessage('Start guessing...');
  //Hiding the range select sections to start the game
  hideTheGameSection(true);
  document.querySelector('.guess-range').value = '';
  guessInputValue();
  highScore = 0;
  document.querySelector('.high-score').textContent = '0';
  resetGameBackgroundColor();
});
