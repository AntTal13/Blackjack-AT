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
stayButton.addEventListener('click', stayFn);
hitButton.addEventListener('click', addCard);

firstTotal.addEventListener('click', setTotal);
secondTotal.addEventListener('click', setTotal);
thirdTotal.addEventListener('click', setTotal);

firstBet.addEventListener('click', placeBet);
secondBet.addEventListener('click', placeBet);
thirdBet.addEventListener('click', placeBet);

hitButton.style.visibility = 'hidden'
stayButton.style.visibility = 'hidden'
dealerScore.style.visibility = 'hidden'
playerScore.style.visibility = 'hidden'

/*----- functions -----*/
init();

function init() {


}
//------------------------------------------------------------------
// PICK TOTAL
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
}
//------------------------------------------------------------------

// HANDLE TURN
function handleTurn () { 


}

//   placeBet()
// // PICK BET
// // WILL CYCLE BACK BET
//   playButton.addEventListener('click', dealEachHand);
// // CLICK PLAY
//   // HIT
// // STAY
//   dealerTurn()
// // CONTINUES TO ADD CARD UNTIL WIN CON MET
// // BET RESULT
//   betResult()
// // CHECK IF GAME OVER
// //
// // IF GAME OVER -- PLAY BUTTON REAPPEARS 
// // TOTAL REAPPEARS
// }

function buildOriginalDeck() {
  const deck = [];
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        face: `${suit}${rank}`,
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
  hitButton.style.visibility = 'visible';
  stayButton.style.visibility = 'visible';
  playerScore.style.visibility = 'visible';
  playerHandValue();
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
  playerHandValue();
  if (playerHandTotal >= 21) {
      hitButton.style.visibility = 'hidden';
      stayButton.style.visibility = 'hidden';
      getWinner()
      renderMessage()
  }
}

// FUNCTION TO JUST FLIP THE CARD ON STAY
function stayFn () {
  dealerScore.style.visibility = 'visible';
  hitButton.style.visibility = 'hidden';
  stayButton.style.visibility = 'hidden';
  let cards = ''
  dealer[0].forEach(function(card) {
    cards += `<div class="card ${card.face}"></div>`;
    dealerCards.innerHTML = cards;
  })
  dealerHandValue();
  getWinner();
  renderMessage();
}

// THEN FUNCTION BELOW TO EXECUTE DEALER'S TURN...
function dealerTurn () {
  // FLIP CARD, THEN ADD MORE CARDS....
  let card = getRandomCard()
  dealer[0].push(card);
  let cards = ''
  dealer[0].forEach(function(card) {
    cards += `<div class="card ${card.face}"></div>`;
    dealerCards.innerHTML = cards;
  })
  dealerHandValue();
  getWinner()
  renderMessage()
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
}

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
  }
}

function betResult () {
  if (total === 0) {
    return winner = null;
  } else if (bet > total) {
    return;
  } else if (winner === true) {
    total = total + bet
    return totalAmount.innerText = `Total In: $${total}`
  } else if (winner === false) {
    total = total - bet
    return totalAmount.innerText = `Total In: $${total}`
  }
}

function renderMessage() {
  if (winner === true) {
    mainMessage.innerHTML = 'You Won!';
  } else if (winner === false) {
    mainMessage.innerHTML = 'You Lost...';
  } else if (winner === null) {
    mainMessage.innerHTML = 'GAME OVER';
  }
}
