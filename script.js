'use strict';

const guessMessage = document.querySelector('.guess-message');
const question = document.querySelector('.question');
const score = document.querySelector('.score');
const highScoresArea = document.querySelector('.highscore');

const generateRandomNumber = () => {
  const secretNumber = Math.trunc(Math.random() * 20) + 1;
  console.log(secretNumber);
  return secretNumber;
};

const startNewGame = () => {
  secretNumber = generateRandomNumber();
  document.querySelector('body').style.backgroundColor = 'black';
  question.style.width = '25rem';
  question.textContent = '???';
  setScores(20);
  setGuessMessage('Начни угадывать!');
  document.querySelector('.check').addEventListener('click', testNumber);
};

const looseGame = () => {
  setScores(0);
  setGuessMessage('Вы проиграли(');
  document.querySelector('body').style.backgroundColor = 'red';
  question.style.width = '0';
  question.textContent = '';
};

const wonGame = (scores) => {
  setGuessMessage('Правильно!');
  question.textContent = secretNumber;
  document.querySelector('body').style.backgroundColor = 'rgb(9, 250, 21)';
  question.style.width = '50rem';
  document.querySelector('.check').removeEventListener('click', testNumber);
  if (scores > highScore) {
    setHightScores(scores);
  }
};

const setScores = (newscores) => {
  scores = newscores;
  score.textContent = newscores;
};

const setHightScores = (scores) => {
  highScore = scores;
  highScoresArea.textContent = scores;
};

const setGuessMessage = (message) => {
  guessMessage.textContent = message;
};

const testNumber = () => {
  const guessingNumber = Number(document.querySelector('.number-input').value);
  // incorrect input
  if (!guessingNumber) {
    setGuessMessage('Введите число!');
    // Player WON
  } else if (guessingNumber === secretNumber) {
    wonGame(scores);
    // Too HIGHT
  } else if (guessingNumber > secretNumber) {
    if (scores > 1) {
      setGuessMessage('Слишком много!');
      scores--;
      score.textContent = scores;
    } else {
      looseGame();
    }
    // Too LOW
  } else if (guessingNumber < secretNumber) {
    if (scores > 1) {
      setGuessMessage('Слишком мало!');
      scores--;
      setScores(scores);
    } else {
      looseGame();
    }
  }
};

let secretNumber = generateRandomNumber();

let scores = 20;
let highScore = 0;

startNewGame();

document.querySelector('.again').addEventListener('click', () => {
  startNewGame();
});
