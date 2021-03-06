//setting variables
const deck = document.getElementsByClassName('deck')[0];
let card = document.querySelectorAll('.card');
let cards = [...card];  //holds all cards in an array

//moves variables

let moves = 0;
let count = document.getElementsByClassName('moves')[0];
let points = 0;

//star rating

const starIcons = document.querySelectorAll('.fa-star');

let selectedCards = [];  //empty array for selected cards
let matchedCards= []; //array for matched cards



for (var i = 0; i < cards.length; i++){
  cards[i].addEventListener('click', displaySymbol);
}; //event listener to function below, as suggested

function displaySymbol() {
  this.classList.toggle('open'); //changes colour of the card for the same when it is opened
  this.classList.toggle('show'); //showing symbol on a card
  this.classList.toggle('blocked'); //blocking another click on a card that is already opened
}

let cardsSelected = []; //array that contains picked cards

function cardSelection(card) { //push cards to array of selected cards
  cardsSelected.push(this);
  moveCount();
  const chance = cardsSelected.length;
  if (chance === 2) {
    if (cardsSelected[0].type === cardsSelected[1].type) { //are types the same?
      matched();  //yes
    } else {
      unmatched(); //no
    }

  }
};

function matched() { //if yes
  cardsSelected[0].classList.add('match'); //add class match
  cardsSelected[1].classList.add('match');
  cardsSelected[0].classList.remove('open', 'show');  //erase classes that are not needed
  cardsSelected[1].classList.remove('open', 'show');
  cardsSelected = [];
  pointsCount();
}

function unmatched() {
  /*cardsSelected[0].classList.add("show", "open");
  cardsSelected[1].classList.add("show", "open");*/
  cardsSelected[0].classList.add("unmatched");
  cardsSelected[1].classList.add("unmatched");

  setTimeout(function(){   //without this part the second card was not showing up
      cardsSelected[0].classList.remove("show", "open","unmatched", 'blocked');
      cardsSelected[1].classList.remove("show", "open", "unmatched", 'blocked'); //erasing blocked allows to click on the same card many times
      /*enable();*/
      cardsSelected = [];
  },1100);
}

function pointsCount() {
  points++;
  document.getElementsByClassName('points')[0].innerHTML = `POINTS: ${points}`;
}

function moveCount() {
  moves++;
  count.innerHTML = `MOVES: ${moves}`;

//erase stars

if (moves > 16) {
  document.getElementById('star1').style.visibility = 'hidden';
  if (moves > 24) {
    document.getElementById('star2').style.visibility = 'hidden';
    }
  }
}

  /*cardsSelected[0].classList.remove("show", "open");
  cardsSelected[1].classList.remove("show", "open");*/

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function startGame(){
  // shuffle deck
  var shuffledCards = shuffle(cards);  //deck is being shuffled
  for (i = 0; i < shuffledCards.length; i++){ //loop through shuffled cards and...
    shuffledCards.forEach(function(item) {
      deck.appendChild(item);  //add each shuffled card to the deck!
    });
  }
}

window.onload = startGame();  //game starts as document loads

//setting timer
//timer starts at first click
for (var i = 0; i < cards.length; i++){
  cards[i].addEventListener('click', timeStart);
}; //event listener to each card

var timer = document.getElementsByClassName("timer")[0];  //choosing first element of this class
var interval;
let second = 0;
let minute = 0;

function timeStart (){
  interval = setInterval(function() {
    timer.innerHTML = `${minute} minutes and ${second} seconds`;
    second++;

    if(second == 60) {
      minute++;
      second = 0;
    }
  }, 1000)
}



for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displaySymbol);
    card.addEventListener("click", cardSelection);
};
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
