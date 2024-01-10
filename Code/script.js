'use strict';

// selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
// const currentScore0El = document.getElementById('current--0');

const btnNewEl = document.querySelector('.btn--new'); //button
const btnRollEl = document.querySelector('.btn--roll'); //button
const btnHoldEl = document.querySelector('.btn--hold'); //button
//
//
//
//starting conditions
// score0El.textContent = 0; //javascript will convert 0 number to string and then display it one UI.
// score1El.textContent = 0;
// diceEl.classList.add('hidden');
//
//
//
//state variable
let currentScore, activePlayer, score, playing;
// we set this as because because use this value to access total value from array of total score.

const init = function () {
  // console.log('new game');
  playing = true;
  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];

  //UI
  score1El.textContent = 0;
  score0El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  //
  // document.getElementById(`current--${activePlayer}`).textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  //added class active player to player 0
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
//
//
//

init();
//
//
//
//switch player function
const switchPlayer = function () {
  //switch to next player
  currentScore = 0;
  // currentScore0El.textContent = currentScore;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  activePlayer = activePlayer === 0 ? 1 : 0;

  player1El.classList.toggle('player--active');
  player0El.classList.toggle('player--active');
};

//
//
//
//Rolling Dice Functionality
btnRollEl.addEventListener('click', function () {
  //
  //if running state value is true
  if (playing) {
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2. Display Dice
    //change the img based on dice value
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled 1
    //add value to current if dice value is not equal to 1
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      // currentScore0El.textContent = currentScore; //CHANGE LATER
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
//
//
//
//Hold buttom event
btnHoldEl.addEventListener('click', function () {
  //
  //if running state variable value is true
  if (playing) {
    //1. add current score to player total score
    score[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    //2. check if player wins i.e. score>=100
    console.log(score[activePlayer]);
    if (score[activePlayer] >= 100) {
      //
      playing = false;

      console.log(score[activePlayer]);
      //add hideen class to hold dice image when game is over
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      //3. switch the player
      switchPlayer();
    }
  }
});
//
//
//
//Resetting the game
btnNewEl.addEventListener('click', init);
