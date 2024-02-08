'use strict';

const moveResult = document.querySelector('.js-move');
const showSuccess = document.querySelector('.js-success');
const showTime = document.querySelector('.js-time');

const allCards = document.querySelectorAll('.memory__card');

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
const timerInicial = 40;
let countdown;

let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

numbers = numbers.sort(() => {
  return Math.random() - 0.5;
});


const imagePaths = [
  './assets/images/frame.png',
  './assets/images/1.jpg',
  './assets/images/2.jpg',
  './assets/images/3.jpg',
  './assets/images/4.jpg',
  './assets/images/5.jpg',
  './assets/images/6.jpg',
  './assets/images/7.jpg',
  './assets/images/8.jpg',
];

const preloadImages = (paths) => {
  paths.forEach((path) => {
    const img = new Image();
    img.src = path;
  });
};

preloadImages(imagePaths);

const blockCards = () => {
  allCards.forEach((blockCard, i) => {
    const currentNumber = numbers[i];
    blockCard.innerHTML = `<img class="frame" src="./assets/images/frame.png"/>
                          <img class="img js-img" src="./assets/images/${currentNumber}.jpg"/>`;
    blockCard.disabled = true;
    btnReset.classList.remove('hidden');
    cardsDiscover = 8;
  });
};

const countTime = () => {
  countdown = setInterval(() => {
    timer--;
    showTime.innerHTML = `Tiempo: ${timer} segundos`;

    if (timer === 0) {
      clearInterval(countdown);
      showSuccess.innerHTML = `¡OH NO! ¡Se acabó el tiempo! <img class="icon" src="./assets/images/triste.png" />`;
      blockCards();
    }
  }, 1000);
};



/**funcion principal **/

const handleClick = (id) => {
  if (!temp) {
    countTime();
    temp = true;
  }

  cardsDiscover++;

  if (cardsDiscover === 1) {
    card1 = document.getElementById(id);
    firstResult = numbers[id];
    card1.innerHTML = `<img class="frame" src="./assets/images/frame.png" />
                      <img class="img js-img" src="./assets/images/${firstResult}.jpg"/>`;
    card1.disabled = true;

  } else if (cardsDiscover === 2) {
    card2 = document.getElementById(id);
    secondResult = numbers[id];
    card2.innerHTML = `<img class="frame" src="./assets/images/frame.png" />
                      <img class="img js-img" src="./assets/images/${secondResult}.jpg"/>`;
    card2.disabled = true;

    move++;
    moveResult.innerHTML = `Movimientos: ${move}`;

    if (firstResult === secondResult) {
      cardsDiscover = 0;
      success++;
      showSuccess.innerHTML = `Aciertos: ${success}`;

      if (success === 8) {
        cardsDiscover = 8;
        clearInterval(countdown);
        showSuccess.innerHTML = `¡Lo lograste! <img class="icon" src="./assets/images/win.png" />`;
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


/* RESET */

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

  allCards.forEach((card) => {
    card.innerHTML = '';
    card.disabled = false;
  });

  numbers = numbers.sort(() => Math.random() - 0.5);

  clearInterval(countdown);

  moveResult.innerHTML = 'Movimientos: 0';
  showSuccess.innerHTML = 'Aciertos: 0';
  showTime.innerHTML = 'Tiempo: 40 segundos';
};

//escuchar los eventos

allCards.forEach((card, id) => {
  card.addEventListener('click', () => handleClick(id));
});

btnReset.addEventListener('click', handleReset);
