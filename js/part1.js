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

const moves = document.querySelector(".moves");
let moveCounter = 0;

function initGame() {
    const deck = document.querySelector('.deck');
    console.log(deck)
    let cardHTML = shuffle(cards).map(function (card) {
        return generateCard(card);

    });

    deck.innerHTML = cardHTML.join('');
    console.log()
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
const allCards = document.querySelectorAll(".card");
let openCards = [];


function toggleCard(card) {
    
}



allCards.forEach(function (card) {
    card.addEventListener("click", function showCard(e) {
        //run if card is not already showing. prevents adding open card to array twice
        if (!card.classList.contains("show") && !card.classList.contains("open") && !card.classList.contains("match")) {
            //add current card to array of open cards and show
            openCards.push(card);
            card.classList.add("open", "show");
            incMoves();

            if (openCards.length == 2) {
                //if cards match, lock
                if (openCards[0].dataset.card == openCards[1].dataset.card) {
                    openCards.forEach(function(card){
                        card.removeEventListener("click", showCard)
                    })
                    matchCards();
                    
                } else {
                    //wait 1 second. if there are 2 cards in array, hide them
                    setTimeout(function () {
                        hideOpenCards();
                        
                    }, 1000)
                }
            };
        } else {

        }


    });
});



function matchCards() {
    openCards.forEach(function (card) {
        card.classList.add("match");
        card.classList.add("open");
        card.classList.remove("show");
        openCards = [];
    })
}

function hideOpenCards() {
    openCards.forEach(function (card) {
        card.classList.remove("open", "show");
    });
    openCards = [];
}

function lockBoard(){
    //don't allow user to click any more cards until they turn back over
}



function youWon() {
    //if all cards have "match" class, user wins!
    alert("You won!");
}



function incMoves() {
    moveCounter += 1;
    moves.innerText = moveCounter;
}