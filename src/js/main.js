'use strict';

const moveResult = document.querySelector('.js-move');
const showSuccess = document.querySelector('.js-success');
const showTime = document.querySelector('.js-time');

const btnReset = document.querySelector('.js-btn');

let cardsDiscover = 0;
let card1 = null;
let card2 = null;
let firstResult = null;
let secondResult = null;
let move = 0;
let success = 0;
let temp = false;
let timer = 40;
let timerInicial = 30;
let countdown;

let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numbers = numbers.sort(() => {
  return Math.random() - 0.5;
});
console.log(numbers);

const countTime = () => {
  countdown = setInterval(() => {
    timer--;
    showTime.innerHTML = `Tiempo: ${timer} segundos`;

    if (timer === 0) {
      clearInterval(countdown);
      showSuccess.innerHTML = `¡Se acabó el tiempo!`;
      blockCards();
    }
  }, 1000);
};

const blockCards = () => {
  let i = 0;
  for (const blockCard of document.querySelectorAll(i)) {
    blockCard.innerHTML = numbers[i];
    blockCard.disabled = true;
    i++;
  }
};

/**funcion principal */

const uncover = (id) => {
  if (!temp) {
    countTime();
    temp = true;
  }

  cardsDiscover++;
  console.log(cardsDiscover);

  if (cardsDiscover === 1) {
    card1 = document.getElementById(id);
    firstResult = numbers[id];
    card1.innerHTML = `<img class="frame" src="./assets/images/frame.png" /><img class="img js-img" src="./assets/images/${firstResult}.jpg"/>`;
    card1.disabled = true;
  } else if (cardsDiscover === 2) {
    card2 = document.getElementById(id);
    secondResult = numbers[id];
    card2.innerHTML = `<img class="frame" src="./assets/images/frame.png" /><img class="img js-img" src="./assets/images/${secondResult}.jpg"/>`;
    card2.disabled = true;

    move++;
    moveResult.innerHTML = `Movimientos: ${move}`;

    if (firstResult == secondResult) {
      cardsDiscover = 0;
      success++;
      showSuccess.innerHTML = `Aciertos: ${success}`;

      if (success === 8) {
        clearInterval(countdown);
        showSuccess.innerHTML = `¡Lo lograste!`;
        showTime.innerHTML = `Lo acabaste en ${timerInicial - timer} segundos`;
        moveResult.innerHTML = `Lo hiciste con ${move} movimientos`;
        btnReset.classList.remove('hidden');
      }
    } else {
      setTimeout(() => {
        card1.innerHTML = '';
        card2.innerHTML = '';
        card1.disabled = false;
        card2.disabled = false;
        cardsDiscover = 0;
      }, 800);
    }
  }
};

const handleReset = () => {
  btnReset.classList.add('hidden');
  cardsDiscover = 0;
  card1 = null;
  card2 = null;
  firstResult = null;
  secondResult = null;
  move = 0;
  success = 0;
  temp = false;
  timer = 40;

  // Restaurar las cartas a su estado original
  const allCards = document.querySelectorAll('.memory__card');
  allCards.forEach((card) => {
    card.innerHTML = '';
    card.disabled = false;
  });

  // Desordenar nuevamente el array de números
  numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  numbers = numbers.sort(() => Math.random() - 0.5);
  console.log(numbers);

  // Detener el temporizador si está en funcionamiento
  clearInterval(countdown);

  // Reiniciar los elementos HTML relacionados con el juego
  moveResult.innerHTML = 'Movimientos: 0';
  showSuccess.innerHTML = 'Aciertos: 0';
  showTime.innerHTML = 'Tiempo: 40 segundos'; // O el tiempo inicial que desees
};

btnReset.addEventListener('click', handleReset);
