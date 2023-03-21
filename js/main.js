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
let turn;
let shuffledDeck;
let dealer = [];
let player = [];

let totalOne = 50;
let totalTwo = 100;
let totalThree = 250;
let betOne = 5;
let betTwo = 10;
let betThree = 25;

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
  //card.innerHTML = `<div class="card ${card.face}"></div>`
  player[0].push(card);

  playerCards.innerHTML = player[0];
  console.log(player);
// THE HIT FEATURE
// Can hit as long as 21 is not surpassed. Values need to be added here
}

function stayTurnOver () {
  // STILL NEED TO FLIP DEALER CARD FACE UP, TOTAL VALUE
  //
  let card = getRandomCard()
  //card.innerHTML = `<div class="card ${card.face}"></div>`
  dealer[0].push(card);

  dealerCards.innerHTML = dealer[0];
  console.log(dealer);
// hand <= 21
// dealer's turn can be handled here, as there would be no dealer turn
// if stay was not called upon
// DEALER RULES IN EFFECT
// Dealer continues to add card until they have a better hand than the
// player AND less than 21 OR they bust (surpass 21) *For now, no push
}

function setTotal (evt) {
  let target = evt.target;
  if (target.id === 'first') {
    totalAmount.innerText = `Total In: $${totalOne}`;
  } else if (target.id === 'second') {
    totalAmount.innerText = `Total In: $${totalTwo}`;
  } else if (target.id === 'third') {
    totalAmount.innerText = `Total In: $${totalThree}`;
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
    betThisHand.innerText = `Bet This Hand: $${betOne}`;
  } else if (target.id === 'mid') {
    betThisHand.innerText = `Bet This Hand: $${betTwo}`;
  } else if (target.id === 'high') {
    betThisHand.innerText = `Bet This Hand: $${betThree}`;
  }
// wager <= total
// wager > 0
// 1 of 3 options
// when bet is selected, that value is subtracted from total

}

function renderMessage() {
  if (winner === 'yes') {
    mainMessage.innerHTML = 'You Won!';
  } else if (winner === 'no') {
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
  if (playerHandTotal === 21) {
    return winner === 'yes';
  } else if (playerHandTotal > 21) {
    return winner === 'no';
  } else if (playerHandTotal < 21) {
    if (playerHandTotal < dealerHandTotal <= 21) {
      return winner === 'no';
    } else if (playerHandTotal < dealerHandTotal > 21) {
      return winner === 'yes';
    }
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

