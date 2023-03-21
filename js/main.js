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

let total = 0;
let bet = 0;

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
function init() {
  if (total === 0) return;
  winner; 
  shuffledDeck;
  dealer = [];
  player = [];
  dealerCards.innerHTML = '';
  playerCards.innerHTML = '';
  playerScore.innerHTML = '';
  dealerScore.innerHTML = '';
  mainMessage.innerHTML = 'Blackjack!'
  bet = 0;
  firstBet.style.backgroundColor = 'red';
  secondBet.style.backgroundColor = 'red';
  thirdBet.style.backgroundColor = 'red';
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
  if (!bet) {
    return;
  }
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

function playerHandValue () {
  let sum = 0;
  player[0].forEach(function(item, index) {
    let cardValues = item.value;
    return sum += cardValues; 
  })
  playerScore.innerText = sum;
  return playerHandTotal = parseInt(playerScore.innerText)
}

function dealerHandValue () {
  let sum = 0;
  dealer[0].forEach(function(item, index) {
    let cardValues = item.value;
    return sum += cardValues; 
  })
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
  playerHandValue();
  if (playerHandTotal >= 21) {
      hitButton.style.visibility = 'hidden';
      stayButton.style.visibility = 'hidden';
      getWinner()
      renderMessage()
      betResult();
      playButton.style.visibility = 'visible'
  }
}

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
  if (dealerHandTotal > playerHandTotal) {
    betResult();
  } else if (dealerHandTotal <= playerHandTotal) {
    dealerTurn()
  }
  playButton.style.visibility = 'visible'
}

function dealerTurn () {
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
  betResult();
  if (dealerHandTotal <= playerHandTotal) {
    dealerTurn()
  }
  playButton.style.visibility = 'visible'
}

function placeBet (evt) {
  let target = evt.target;
  if (target.id === 'low') {
    bet = 5;
    firstBet.style.backgroundColor = 'black';
    secondBet.style.backgroundColor = 'red';
    thirdBet.style.backgroundColor = 'red';
  } else if (target.id === 'mid') {
    bet = 10;
    firstBet.style.backgroundColor = 'red';
    secondBet.style.backgroundColor = 'black';
    thirdBet.style.backgroundColor = 'red';
  } else if (target.id === 'high') {
    bet = 25;
    firstBet.style.backgroundColor = 'red';
    secondBet.style.backgroundColor = 'red';
    thirdBet.style.backgroundColor = 'black';
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
