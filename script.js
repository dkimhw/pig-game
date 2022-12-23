'use strict';


/*

1. Replace image with the correct dice roll
2. Build win logic
  - when both players have gone
  - roll = 1 ends turn and sets zero
  - whoever has the higher score gets += 1 to the game_score
3. Build new game logic
  - reset all of the important game state variables
  - set current player to player 1
*/

// Total scores over multiple games
let currentPlayer = 'player1';
const gameState = {
  player1: {
    game_score: 0,
    curr_score: 0,
    section: document.querySelector('.player--0'),
    game_score_dom: null,
    curr_score_dom: document.querySelector('#current--0'),
  },
  player2: {
    game_score: 0,
    curr_score: 0,
    section: document.querySelector('.player--1'),
    game_score_dom: null,
    curr_score_dom: document.querySelector('#current--1'),
  }
}

// Necessary dom elements
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const diceImg = document.querySelector('.dice');

// Returns a random num between 1-6
const rollDice = () => {
  return Math.ceil(Math.random() * 6);
};

// Rolling dice event
rollDiceBtn.addEventListener('click', () => {
  let diceVal = rollDice();
  diceImg.src = `dice-${diceVal}.png`;
  let player = gameState[currentPlayer];
  player.curr_score += diceVal;
  player.curr_score_dom.textContent = player.curr_score;
});

// Hold btn click event
holdBtn.addEventListener('click', () => {
  let player = gameState[currentPlayer];
  currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
  let newPlayer = gameState[currentPlayer];

  player.section.classList.remove('player--active');
  newPlayer.section.classList.add('player--active');
})
