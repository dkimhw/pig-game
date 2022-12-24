'use strict';


/*
Game state variables
*/
let currentPlayer = 'player1';
const gameState = {
  player1: {
    gameScore: 0,
    currScore: 0,
    section: document.querySelector('.player--0'),
    gameScoreDom: document.querySelector('#score--0'),
    currScoreDom: document.querySelector('#current--0'),
  },
  player2: {
    gameScore: 0,
    currScore: 0,
    section: document.querySelector('.player--1'),
    gameScoreDom: document.querySelector('#score--1'),
    currScoreDom: document.querySelector('#current--1'),
  }
}


/*
Dom elements
*/

// Necessary dom elements
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const diceImg = document.querySelector('.dice');
const newGameBtn = document.querySelector('.btn--new');

// Set game score to zero and img to none
gameState.player1.gameScoreDom.textContent = 0;
gameState.player2.gameScoreDom.textContent = 0;


/*
Helper Functions
*/

// Returns a random num between 1-6
const rollDice = () => {
  return Math.ceil(Math.random() * 6);
};

// Disable buttons
const disableButtons = () => {
  holdBtn.disabled = true;
  rollDiceBtn.disabled = true;
}

// Enable buttons
const enableButtons = () => {
  holdBtn.disabled = false;
  rollDiceBtn.disabled = false;
}

// Check win
const checkWin = () => {
  let playerOne = gameState['player1'];
  let playerTwo = gameState['player2'];
  if (playerOne.gameScore > 100) {
    alert('Player 1 Won!');
    disableButtons();
  } else if (playerTwo.gameScore > 100) {
    alert('Player 2 Won');
    disableButtons();
  }
};

// New game
const reset = () => {
  let playerOne = gameState['player1'];
  let playerTwo = gameState['player2'];

  playerOne.currScore = 0;
  playerOne.gameScore = 0;
  playerOne.currScoreDom.textContent = 0;
  playerOne.gameScoreDom.textContent = 0;

  playerTwo.currScore = 0;
  playerTwo.gameScore = 0;
  playerTwo.currScoreDom.textContent = 0;
  playerTwo.gameScoreDom.textContent = 0;

  currentPlayer = 'player1';
  enableButtons();
}

// If a player rolls an one
const diceRollOne = () => {
  // current score goes to zero
  let player = gameState[currentPlayer];
  player.currScore = 0;
  player.currScoreDom.textContent = 0;

  // pass it to the next player if turns < 2
  currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
  let newPlayer = gameState[currentPlayer];
  player.section.classList.remove('player--active');
  newPlayer.section.classList.add('player--active');
}

// Rolling dice event
rollDiceBtn.addEventListener('click', () => {
  let diceVal = rollDice();
  diceImg.src = `dice-${diceVal}.png`;

  if (diceVal === 1) {
    diceRollOne();
  } else {
    let player = gameState[currentPlayer];
    player.currScore += diceVal;
    player.currScoreDom.textContent = player.currScore;
  }
});

/*
Events
*/

// Hold btn click event
holdBtn.addEventListener('click', () => {
  // Clean up current player
  let player = gameState[currentPlayer];
  player.gameScore += player.currScore;
  player.gameScoreDom.textContent = player.gameScore;
  player.currScore = 0;
  player.currScoreDom.textContent = 0;

  // Check if player own
  checkWin();

  // Switch player
  currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
  let newPlayer = gameState[currentPlayer];
  player.section.classList.remove('player--active');
  newPlayer.section.classList.add('player--active');

});

// Start a new game
newGameBtn.addEventListener('click', reset);
