/*jslint node, for */
/*globals Promise, Set */

// Options
var csv = 'data/clues.csv';

// Modules
var parse = require('csv-parse/lib/sync');
var fs = require('fs');

// Get the clues from the CSV
function clues(csv) {
    'use strict';
    return new Promise(function (resolve) {
        fs.readFile(csv, 'utf8', function (error, data) {
            if (error) {
                throw error;
            }
            var parsedData = parse(data, {columns: true, skip_empty_lines: true});
            resolve(parsedData);
        });
    });
}

// Write the clues to public/data.js
function writeDataFile(cards) {
    'use strict';
    return new Promise(function (resolve, reject) {
        fs.writeFile('public/data.js',
                'var cards = ' + JSON.stringify(cards),
                'utf8',
                function (error) {
            if (error) {
                reject(error);
            } else {
                resolve('Done!');
            }
        });
    });
}

// Create cards
function createCards(cluesByType) {
    'use strict';
    return new Promise(function (resolve, reject) {
        var cards = [];
        var outOfClues = false;

        // Check number of remaining clues
        function remainingClues() {

            // Check that all types include at least five clues
            var counter = 0;
            cluesByType.forEach(function (type) {
                counter += type.clues.length;
            });
            if (counter < 5) {
                return false;
            } else {
                return counter;
            }
        }

        // Get next cluesByType
        var currentTypesIndex = 0;
        function nextType() {
            var type = cluesByType[currentTypesIndex];
            currentTypesIndex = (currentTypesIndex + 1) % cluesByType.length;

            // Only return a type that still contains clues
            if (type.clues.length === 0) {
                if (remainingClues() === false) {
                    console.log('Not enough clues for another card.');
                    outOfClues = true;
                } else {
                    return nextType();
                }
            } else {
                return type;
            }
        }

        // Create a card
        function createCard() {
            var card = [];

            function addNextClue(card) {
                var clue;
                var type = nextType();

                // If a type has clues, select the first one
                // and remove it from the array with shift()
                if (type && outOfClues === false && type.clues.length > 0) {
                    clue = type.clues.shift();

                    // If the card doesn't contain that clue already,
                    // add it to the card. Otherwise, try again.
                    if (card.indexOf(clue) === -1) {
                        card.push(clue);
                    } else {
                        addNextClue(card);
                    }
                } else {
                    addNextClue(card);
                }
            }

            var i;
            for (i = 0; i < 5; i += 1) {
                addNextClue(card);
            }

            return card;
        }

        // Keep making cards while we still have clues
        var numberOfCards = Math.round(remainingClues() / 5) - 1;
        console.log('numberOfCards: %d', numberOfCards);
        var i;
        for (i = 0; i < numberOfCards; i += 1) {
            cards.push(createCard());
        }

        if (cards.length > 0) {
            console.log('Created %d cards', cards.length);
            resolve(cards);
        } else {
            reject('Couldn\'t create cards.');
        }
    });
}

// Put the clues into type arrays.
// Create card sets of five clues by taking one clue from each type.
// If there are none left in a type, skip to the next type.
// (It is fine if we end up with some cards with the same type.)
function arrangeCluesByType(clues) {
    'use strict';
    return new Promise(function (resolve, reject) {

        // Fill the array of clue types
        var cluesByType = [];

        function clueTypes() {
            var types = [];
            clues.forEach(function (clue) {
                types.push(clue.Type);
            });
            var uniqueTypes = Array.from(new Set(types));
            return uniqueTypes;
        }

        clueTypes().forEach(function (type) {
            var object = {
                type: type,
                clues: []
            };
            clues.forEach(function (clue) {
                if (clue.Type === type) {
                    object.clues.push(clue.Clue);
                }
            });
            cluesByType.push(object);
        });

        if (cluesByType.length === clueTypes().length) {
            resolve(cluesByType);
        } else {
            reject('Something went wrong sorting clues into types.');
        }
    });
}

// Randomise the list
// https://stackoverflow.com/a/12646864/1781075
function shuffle(array) {
    'use strict';
    return new Promise(function (resolve, reject) {
        var i, j, temp;
        for (i = array.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1));
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        if (array.length) {
            resolve(array);
        } else {
            reject('Dang, nuked the array.');
        }
    });
}

// Main process
function process() {
    'use strict';
    clues(csv)
        .then(shuffle)
        .then(arrangeCluesByType)
        .then(createCards)
        .then(writeDataFile);
}

// Start process
process();
