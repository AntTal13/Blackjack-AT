/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

/*----- cached elements  -----*/
let mainMessage = document.querySelector('h1');

let dealerScore = document.getElementsByClassName('dealer-hand-score');
let playerScore = document.getElementsByClassName('player-hand-score');

let dealerCards = document.getElementById('dealercards');
let playerCards = document.getElementById('playercards');

let hitButton = document.getElementById('hit');
let stayButton = document.getElementById('stay');
let playButton = document.getElementById('play');

let firstTotal = document.getElementById('first');
let secondTotal = document.getElementById('second');
let thirdTotal = document.getElementById('third');
let firstBet = document.getElementById('low');
let secondBet = document.getElementById('mid');
let thirdBet = document.getElementById('high');

// Build an 'original' deck of 'card' objects used to create shuffled decks
const originalDeck = buildOriginalDeck();

/*----- state variables -----*/
let winner;
let turn;
let shuffledDeck;
let dealer = [];
let player = [];

/*----- event listeners -----*/
playButton.addEventListener('click', dealEachHand);
stayButton.addEventListener('click', stayTurnOver);
hitButton.addEventListener('click', addCard);

firstTotal.addEventListener('click', setTotal);
secondTotal.addEventListener('click', setTotal);
thirdTotal.addEventListener('click', setTotal);

firstBet.addEventListener('click', placeBet);
secondBet.addEventListener('click', placeBet);
thirdBet.addEventListener('click', placeBet);


/*----- functions -----*/
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

function getRandomCard () {
  const tempDeck = [...originalDeck];
  const rndIdx = Math.floor(Math.random() * tempDeck.length);
  const randomCard = tempDeck[rndIdx]
    // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
    tempDeck.splice(rndIdx, 1)
    return randomCard;
}

function dealEachHand () {
  const dealerHand = [getRandomCard(), getRandomCard()];
  dealerCards.innerHTML = ''
  let cardsHtml = ''
  dealerHand.forEach(function(card) {
    if(card === dealerHand[0]) {
      cardsHtml += `<div class="card back-red"></div>`;
    } else {
    cardsHtml += `<div class="card ${card.face}"></div>`;
    //console.log(card);
    dealerCards.innerHTML = cardsHtml;
  }})
  const playerHand = [getRandomCard(), getRandomCard()];
  playerCards.innerHTML = ''
  let cards = ''
  playerHand.forEach(function(card) {
    cards += `<div class="card ${card.face}"></div>`;
    playerCards.innerHTML = cards;
  })
  player.push(playerHand);
  dealer.push(dealerHand);
  //playButton.style.visibility = 'hidden';
}

console.log(player)
console.log(dealer)

function setTotal () {
// click on total in amount
// box goes away and value is converted to number
// number displayed in box and adjusted with each hand win/loss/tie
// when bet is selected, total is deducted
// zero... game over
}

function placeBet () {
// wager <= total
// wager > 0
// 1 of 3 options
// when bet is selected, that value is subtracted from total
}

function addCard () {

// THE HIT FEATURE
// Can hit as long as 21 is not surpassed. Values need to be added here
}

function stayTurnOver () {
// hand <= 21
// dealer's turn can be handled here, as there would be no dealer turn
// if stay was not called upon
// DEALER RULES IN EFFECT
// FLIP DEALER CARD FACE UP, TOTAL VALUE
// Dealer continues to add card until they have a better hand than the
// player AND less than 21 OR they bust (surpass 21) *For now, no push
}

function handValue () {
// Update per addCard ()
// Needs to be seen on board
}

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

// function getWinner () {
// if hand value === 21 , then win
// if hand value is < 21 , stay is executed and dealer exceeds 21 , win
// if hand exceeds 21 , lose
// if hand is < 21 , stay is called but dealer's hand has higher value w/o
//    exceeding 21, lose
// NO PUSH FOR NOW
// }

// function renderMessage() {
// IF win , message "You won!"
// IF hand loss, message "Maybe next time..."
// IF hand loss AND game loss, message "GAME OVER"
// }


// function render() {
//     renderBoard();
//     renderMessage();
//     renderControls();
// }
  
// function renderBoard() {

// }
  
  
// function renderControls() {

// }

