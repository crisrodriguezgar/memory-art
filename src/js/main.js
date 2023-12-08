'use strict'; 

const cards = document.querySelectorAll('.js-card');
const defaultImages = document.querySelectorAll('.js-default');
const artImages = document.querySelectorAll('.js-img');

const btnReset = document.querySelector('.js-btn');

let flippedCards = [];
let lockBoard = false;

function flipCard(cardElement) { // Función para voltear una tarjeta cuando se hace clic en ella.
  if (lockBoard) return; // Si el tablero está bloqueado, no hace nada.
  if (cardElement === flippedCards[0]) return; // Si la tarjeta ya está volteada, no hace nada.

  const defaultImg = cardElement.querySelector('.js-default'); // Obtiene la imagen por defecto de la tarjeta.
  const artImg = cardElement.querySelector('.js-img'); // Obtiene la imagen de arte de la tarjeta.

  defaultImg.classList.add('hidden');
  artImg.classList.remove('hidden');

  if (flippedCards.length === 0) { // Si no hay tarjetas volteadas, agrega la actual a la lista.
    flippedCards.push(cardElement);
    return;
  } else { // Si ya hay una tarjeta volteada, compara las imágenes.
    flippedCards.push(cardElement);

    const firstCardId = flippedCards[0].querySelector('.js-img').id;
    const secondCardId = flippedCards[1].querySelector('.js-img').id;

    if (firstCardId === secondCardId) { // Si las imágenes coinciden, vacía la lista de tarjetas volteadas.
      flippedCards = [];
    } else { // Si las imágenes no coinciden, se vuelven a voltear después de un breve tiempo.
      lockBoard = true; // Bloquea el tablero.
      setTimeout(() => { 
        flippedCards.forEach(card => {
          card.querySelector('.js-default').classList.remove('hidden');
          card.querySelector('.js-img').classList.add('hidden');
        });
        flippedCards = []; // Vacía la lista de tarjetas volteadas.
        lockBoard = false; // Desbloquea el tablero para continuar el juego.
      }, 1000); 
    }
  }
}

function hideHiddenImages() { 
  artImages.forEach(img => {
    img.classList.add('hidden');
  });
}

function setup() {
  hideHiddenImages();

  cards.forEach(card => {
    card.addEventListener('click', function() {flipCard(card);});
  });
}

setup();


function handleReset(){
    hideHiddenImages();
  
    cards.forEach(card => {
      card.querySelector('.js-default').classList.remove('hidden');
      card.querySelector('.js-img').classList.add('hidden');
    });
  
    flippedCards = [];
    lockBoard = false;
  }

btnReset.addEventListener('click', handleReset);