/*
 * Create a list that holds all of your cards
 */
const cards = ['fa-diamond', 'fa-diamond',
    'fa-paper-plane-o', 'fa-paper-plane-o',
    'fa-anchor', 'fa-anchor',
    'fa-bolt', 'fa-bolt',
    'fa-cube', 'fa-cube',
    'fa-leaf', 'fa-leaf',
    'fa-bicycle', 'fa-bicycle',
    'fa-bomb', 'fa-bomb'
];

let moveCounter = 0;
let openCards = [];

/* variable to be used in timer function*/
let time = 0;
let timerRunning = false;

/* winning condition variables*/
let playerWon = false;
let totalMatches = 8;
let numOfMatches;

function generateCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const deck = document.querySelector('.deck');

function initGame() {
    console.log(deck)
    cardHTML = shuffle(cards).map(function (card) {
        return generateCard(card);
    });
    deck.innerHTML = cardHTML.join('');
    numOfMatches = 0;
};

initGame();


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


/* DOM variables */
const starsList = document.querySelectorAll(".stars li");
const restartBtn = document.querySelector(".restart");
const moves = document.querySelector(".moves");
const timer = document.querySelector(".timer-display");
const allCards = document.querySelectorAll(".card");

/* MAIN EVENT */
function cardListener() {
    allCards.forEach(function (card) {
        card.addEventListener("click", function showCard(e) {
            const targetCard = e.target;
            /* if timmerRunning = false, start the clock and set timerRunning to true  */
            if (!timerRunning) {
                startTimer();
                timerRunning = true;
            }
            //if the target card is not already showing, not already matched, and there aren't already 2 cards showing...
            if (!targetCard.classList.contains("show") && !targetCard.classList.contains("open") && !targetCard.classList.contains("match") && openCards.length < 2) {
                //add current card to array of open cards and show
                toggleCard(targetCard);
                /* Remove event listener for matched cards */
                if (openCards.length == 2) {
                    //if cards match, keep user from being able to click them
                    //count as a move
                    if (openCards[0].dataset.card == openCards[1].dataset.card) {
                        matchCards();
                        incMoves();
                        if (numOfMatches === totalMatches) {
                            playerWon = true;
                            playerWins();
                        }
                    } else {
                        //wait 1 second. if there are 2 cards in array, hide them
                        notMatchCards();
                        setTimeout(function () {
                            hideOpenCards();
                            incMoves();
                            console.log(score)
                        }, 800)

                    }
                };
            } //end if statement
        });
    }); //end forEach
}

// initGame();
cardListener();


/* Start and display the timer when user clicks on deck*/

let timerClock;

function startTimer() {
    // while (timerRunning === true) {
    timerClock = setInterval(function () {
        time++;
        displayTime();
    }, 1000)
    // }
};

let min;
let sec;

function displayTime() {
    min = Math.floor(time / 60);
    sec = time % 60;
    if (sec < 10 && min < 10) {
        timer.innerHTML = `0${min}:0${sec}`
    } else if (sec < 10) {
        timer.innerHTML = `${min}:0${sec}`
    } else {
        timer.innerHTML = `${min}:${sec}`
    }
}

function stopTimer() {
    clearInterval(timerClock);
}



/* toggle displaying card face */
function toggleCard(card) {
    openCards.push(card);
    card.classList.add("open", "show");
}

/* mark selected cards as a match */
function matchCards() {
    openCards.forEach(function (card) {
        card.classList.add("match");
        card.classList.add("open");
        card.classList.remove("show");
        openCards = [];
    })
    numOfMatches++;
};

function notMatchCards() {
    openCards.forEach(function (card) {
        card.classList.add("not-match");
        setTimeout(function () {
            card.classList.remove("not-match");
        }, 1000)
        
    })
}

/*hide selected cards that do not match */
function hideOpenCards() {
    openCards.forEach(function (card) {
        card.classList.remove("open", "show", "not-match");
    });
    openCards = [];
};

let score;

/* increase the number of moves and set score in stars */
function incMoves() {
    moveCounter += 1;
    moves.innerText = moveCounter;
    //set star score
    if (moveCounter > 12 && moveCounter <= 18) {
        //if player uses more than 18 moves, but less than 24, deduct one star
        for (i = 0; i < starsList.length; i++) {
            if (i > 1) {
                starsList[i].style.visibility = "collapse";
                score = starsList.length - 1;
            }
        }
    } else if (moveCounter > 18 && moveCounter <= 24) {
        //if player uses more than 24 moves, but less than 32, deduct another star
        for (i = 0; i < starsList.length; i++) {
            if (i > 0) {
                starsList[i].style.visibility = "collapse";
                score = starsList.length - 2;
            }
        }
    }
};

function restartGame() {
    location.reload();
}

restartBtn.addEventListener("click", restartGame);

const modalOverlay = document.querySelector('.modal-overlay');
const modal = document.querySelector('.modal');
const winnerMoves = document.querySelector('.winner-moves');
const winnerTime = document.querySelector('.winner-time');
const winnerScore = document.querySelector('.winner-score');
const winnerRestart = document.querySelector('.winner-restart');


function playerWins() {
    stopTimer();
    //modal pops up, shows score and time
    modalOverlay.classList.remove("hidden");
    winnerMoves.innerText = `You did it in ${moveCounter} moves`;
    winnerTime.innerText = `You did it in ${min} minutes and ${sec} seconds`;
    winnerScore.innerText = `Your score is ${score} stars`;
}

winnerRestart.addEventListener("click", restartGame);