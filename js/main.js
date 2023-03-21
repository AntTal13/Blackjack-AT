/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

/*----- cached elements  -----*/
let mainMessage = document.querySelector('h1');

let dealerScore = document.getElementById('dealer-hand-score');
let playerScore = document.getElementById('player-hand-score');

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
let totalAmount = document.querySelector('fieldset');
let betThisHand = document.getElementById('next');

// Build an 'original' deck of 'card' objects used to create shuffled decks
const originalDeck = buildOriginalDeck();

/*----- state variables -----*/
let winner;
let shuffledDeck;
let dealer = [];
let player = [];

let playerHandTotal;
let dealerHandTotal;

let total;
let bet;

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
  playButton.style.visibility = 'hidden';
}

console.log(dealer)
console.log(player)


function playerHandValue () {
  let sum = 0;
  player[0].forEach(function(item, index) {
    let cardValues = item.value;
    return sum += cardValues; 
  })
  console.log(sum);
  playerScore.innerText = sum;
  return playerHandTotal = parseInt(playerScore.innerText)
}

function dealerHandValue () {
  let sum = 0;
  dealer[0].forEach(function(item, index) {
    let cardValues = item.value;
    return sum += cardValues; 
  })
  console.log(sum);
  dealerScore.innerText = sum;
  return dealerHandTotal = parseInt(dealerScore.innerText)
}

function addCard () {
  let card = getRandomCard()
  player[0].push(card);
  let cards = ''
  player[0].forEach(function(card) {
    cards += `<div class="card ${card.face}"></div>`;
    playerCards.innerHTML = cards;
  })
  console.log(player[0]);
}

function stayTurnOver () {
  let card = getRandomCard()
  dealer[0].push(card);
  let cards = ''
  dealer[0].forEach(function(card) {
    cards += `<div class="card ${card.face}"></div>`;
    dealerCards.innerHTML = cards;
  })
  console.log(dealer);
}

function setTotal (evt) {
  let target = evt.target;
  if (target.id === 'first') {
    total = 50;
    totalAmount.innerText = `Total In: $${total}`;
  } else if (target.id === 'second') {
    total = 100
    totalAmount.innerText = `Total In: $${total}`;
  } else if (target.id === 'third') {
    total = 250
    totalAmount.innerText = `Total In: $${total}`;
  }
// click on total in amount
// box goes away and value is converted to number
// number displayed in box and adjusted with each hand win/loss/tie
// when bet is selected, total is deducted
// zero... game over

}

function placeBet (evt) {
  let target = evt.target;
  if (target.id === 'low') {
    bet = 5;
    betThisHand.innerText = `Bet This Hand: $${bet}`;
  } else if (target.id === 'mid') {
    bet = 10;
    betThisHand.innerText = `Bet This Hand: $${bet}`;
  } else if (target.id === 'high') {
    bet = 25;
    betThisHand.innerText = `Bet This Hand: $${bet}`;
  }
// wager <= total
// wager > 0
// 1 of 3 options
// when bet is selected, that value is subtracted from total

}

function renderMessage() {
  if (winner === true) {
    mainMessage.innerHTML = 'You Won!';
  } else if (winner === false) {
    mainMessage.innerHTML = 'You Lost...';
  } else if (winner === 'game over') {
    mainMessage.innerHTML = 'GAME OVER';
  }
  // IF win , message "You won!"
// IF hand loss, message "Maybe next time..."
// IF hand loss AND game loss, message "GAME OVER"
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

function getWinner () {
  if (playerHandTotal > 21) {
    return winner = false;
  } else if (playerHandTotal < 21) {
      if (playerHandTotal < dealerHandTotal && dealerHandTotal <= 21) {
        return winner = false;
      } else if (playerHandTotal < dealerHandTotal && dealerHandTotal > 21) {
        return winner = true;
      }
  } else if (playerHandTotal === 21) {
      return winner = true;
  // } else if (/*still need to define*/totalIn === 0) {
  //     winner === 'game over';
  // }
  }
}
  // NO PUSH FOR NOW
  
  // function handleBet () {
  //  if (winner === 'yes') {
    //  add bet to total;
  //} else if (winner === 'no') {
    //  subtract bet from total;
  //}
  //}



  // function render() {
    //     renderBoard();
//     renderMessage();
//     renderControls();
// }
  
// function renderBoard() {

// }
  
  
// function renderControls() {

// }

