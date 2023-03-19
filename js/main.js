/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

const PLAYERS = {
    '1':'Player',
    '-1':'Dealer',
}

/*----- cached elements  -----*/
let mainMessage = document.querySelector('h1');
let dealerScore = document.getElementsByClassName('dealer-hand-score');
let playerScore = document.getElementsByClassName('player-hand-score');
const shuffledContainer = document.getElementById('dealercards');
// let dealerCards = document.getElementById('dealercards');
let playerCards = document.getElementById('playercards');
let hitButton = document.getElementsByClassName('hit');
let stayButton = document.getElementsByClassName('stay');
let playButton = document.getElementsByClassName('reset');

let wagerAmount = document.getElementById('textbox');
let totalAmount = document.getElementById('totaltext');

// Build an 'original' deck of 'card' objects used to create shuffled decks
const originalDeck = buildOriginalDeck();
renderDeckInContainer(originalDeck, shuffledContainer);

/*----- state variables -----*/
let winner;
let turn;
let shuffledDeck;

/*----- event listeners -----*/
playButton.addEventListener('click', renderNewShuffledDeck);
// click hit
// click stay
// click play again
// wager
// total


/*----- functions -----*/
function getNewShuffledDeck() {
  // Create a copy of the originalDeck (leave originalDeck untouched!)
  const tempDeck = [...originalDeck];
  const newShuffledDeck = [];
  while (tempDeck.length) {
    // Get a random index for a card still in the tempDeck
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
    newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }
  return newShuffledDeck;
}

function renderNewShuffledDeck() {
  // Create a copy of the originalDeck (leave originalDeck untouched!)
  shuffledDeck = getNewShuffledDeck();
  renderDeckInContainer(shuffledDeck, shuffledContainer);
}

function renderDeckInContainer(deck, container) {
  container.innerHTML = '';
  // Let's build the cards as a string of HTML
  let cardsHtml = '';
  deck.forEach(function(card) {
    cardsHtml += `<div class="card ${card.face}"></div>`;
  });
  // Or, use reduce to 'reduce' the array into a single thing - in this case a string of HTML markup 
  // const cardsHtml = deck.reduce(function(html, card) {
  //   return html + `<div class="card ${card.face}"></div>`;
  // }, '');
  container.innerHTML = cardsHtml;
}

function buildOriginalDeck() {
  const deck = [];
  // Use nested forEach to generate card objects
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        // Setting the 'value' property for game of blackjack, not war
        value: Number(rank) || (rank === 'A' ? 11 : 10)
      });
    });
  });
  return deck;
}

renderNewShuffledDeck();
//------------------------------------------------------------------
// init ();

// function init () {
//     hand = []; // not sure if I need to establish an empty hand yet, but placeholder for now
//     turn = 1;
//     winner = null;
//     render();
// }

// function handleTurn(evt) {
//     // want to set Total Amount
//     // want to enter wager amount
//     // want to deal hand
//     // execute hit or stay OR over 21
//     // pass turn to dealer
//     turn = -1;
//     // get a winner
//     // render
//     winner = getWinner();
//     render();
// }

// function setTotal () {
//     // enter total, upon 'enter' convey as a graphic and update end of turn
// }

// function setWagerAmount () {
//     // enter total, upon 'enter' convey as a graphic and update end of turn
// }

// function shuffleDeck () {
//     // shuffle for new deck between turns
// }

// function dealCards () {
//     // push two cards to dealer and player array
//     // one card face down for dealer
// }

// function getWinner () {

// }

// function render() {
//     renderBoard();
//     renderMessage();
//     renderControls();
// }
  
// function renderBoard() {

// }
  
// function renderMessage() {

// }
  
// function renderControls() {

// }


//TO DO 
// 1. Cache elements
// 2. Declare variables (player, dealer, winner, etc.)
// 3. Shuffle deck
// 4. Push two cards into new array for dealer and players hands
// 5. Only ONE card should be visible for dealer hand
// 6. Additional random cards pushed to 'players hand' until:
//          - 21 reached
//          - Stay clicked
//          - Over 21 totaled 
// 7. IF player hand falls within first two conditions:
//          - Dealer face down card flipped face up
//          - Cards dealt until:
                // - 21 reached
                // - Tie (push) reached
                // - Dealer's hand exceeds 21 and, now, player wins
// 8. UPDATE HAND TOTALS IN APPROPRIATE ELEMENTS

// WAGERING FEATURE
// 1. Player enters total amount to play with
    // -Total input box goes away and that total is displayed in replace
// 2. They can then enter wager amounts and that will impact total based on win/loss/tie
    // - Can just have that be a 1:1 bet for now


