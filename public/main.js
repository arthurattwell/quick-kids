/*jslint browser */
/*globals cards */

// Get next card number
var currentCardIndex = 0;
function nextCard() {
    'use strict';
    currentCardIndex = (currentCardIndex + 1) % cards.length;
    return currentCardIndex;
}

// Get previous card number
function previousCard() {
    'use strict';
    currentCardIndex = (currentCardIndex - 1) % cards.length;
    return currentCardIndex;
}

// Hide the 'previous card' button
function hidePreviousButton() {
    'use strict';
    var previousCardButton = document.getElementById('previous');
    previousCardButton.style.visibility = 'hidden';
}

// Show the 'previous card' button
function showPreviousButton() {
    'use strict';
    var previousCardButton = document.getElementById('previous');
    previousCardButton.style.visibility = 'visible';
}

function nextButtonText(text) {
    'use strict';
    var button = document.getElementById('next');
    button.innerHTML = text;
}

function loadCard(cardIndex) {
    'use strict';
    console.log('cardindex: %d', cardIndex);

    // If we're on the landing card, clear it
    if (document.querySelector('#landing')) {
        document.querySelector('#landing').remove();
    }

    // If the first card, hide the 'previous' button
    nextButtonText('Next card');
    if (cardIndex < 2) {
        hidePreviousButton();
    } else {
        showPreviousButton();
    }

    // Hide the previous card if there is one
    if (document.querySelector('.current-card')) {
        var oldCard = document.querySelector('.current-card');
        oldCard.classList.remove('current-card');
        oldCard.style.display = 'none';
    }

    // Show the next card
    if (document.querySelector('#card ul:nth-child(' + cardIndex + ')')) {
        var cardList = document.querySelector('#card ul:nth-child(' + cardIndex + ')');
        cardList.classList.add('current-card');
        cardList.style.display = 'flex';
    }
}

// Randomise the list
// https://stackoverflow.com/a/12646864/1781075
function shuffle(array) {
    'use strict';
    var i, j, temp;
    for (i = array.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function loadCards() {
    'use strict';

    var container = document.getElementById('card');

    shuffle(cards).forEach(function (card) {
        var list = document.createElement('ul');
        list.style.display = 'none';
        card.forEach(function (clue) {
            var item = document.createElement('li');
            item.innerHTML = clue;
            list.appendChild(item);
        });
        container.appendChild(list);
    });
}

function ready() {
    'use strict';
    loadCards();
    nextButtonText('Start');
    var nextButton = document.getElementById('next');
    nextButton.addEventListener('click', function () {
        loadCard(nextCard());
    });
    var previousButton = document.getElementById('previous');
    previousButton.addEventListener('click', function () {
        loadCard(previousCard());
    });
}

ready();
