const fr = require('../../../tools/fileReader');
const [YEAR, DAY, PART] = ['2023', '07', '2'];

const [FIVE, FOUR, FULL, THREE, TWO, ONE, HIGH] = [64, 32, 16, 8, 4, 2, 1];

const cardScores = new Map([
    ['A', 14],
    ['K', 13],
    ['Q', 12],
    ['J', 1],
    ['T', 10],
    ['9', 9],
    ['8', 8],
    ['7', 7],
    ['6', 6],
    ['5', 5],
    ['4', 4],
    ['3', 3],
    ['2', 2],
]);

class Hand {
    cards;
    bid;
    score;
    constructor(cards, bid, score) {
        this.cards = cards;
        this.bid = bid;
        this.score = score;
    }
}

const DATA = fr
    .getInput(YEAR, DAY)
    .map((x) => {
        x = x.split(' ');
        let hand = x[0];
        let handArray = hand.split('');
        let frequencies = getFrequencies(handArray);
        let score = 0;
        if (isFiveOfAKind(frequencies)) {
            score = score | FIVE;
        } else if (isFourOfAKind(frequencies)) {
            score = score | FOUR;
        } else if (isFullHouse(frequencies)) {
            score = score | FULL;
        } else if (isThreeOfAKind(frequencies)) {
            score = score | THREE;
        } else if (isTwoPair(frequencies)) {
            score = score | TWO;
        } else if (isOnePair(frequencies)) {
            score = score | ONE;
        } else {
            score = score | HIGH;
        }

        return new Hand(handArray, parseInt(x[1]), score);
    })
    .sort((a, b) => {
        let sort = a.score - b.score;
        if (sort === 0) {
            for (let i = 0; i < a.cards.length; i++) {
                if (cardScores.get(a.cards[i]) > cardScores.get(b.cards[i])) {
                    return 1;
                } else if (cardScores.get(a.cards[i]) < cardScores.get(b.cards[i])) {
                    return -1;
                }
            }
            return 0;
        }
        return sort;
    })
    .reduce((total, curr, index) => {
        return total + curr.bid * (index + 1);
    }, 0);

function isFiveOfAKind(frequencies) {
    let hasAFiver = false;
    for (let frequency of Object.values(frequencies)) {
        if (frequency + frequencies['J'] === 5 || frequency === 5) {
            hasAFiver = true;
            break;
        }
    }

    return hasAFiver;
}

function isFourOfAKind(frequencies) {
    let hasAFoursome = false;
    let wilds = frequencies['J'] || 0;

    for (let [card, frequency] of Object.entries(frequencies)) {
        if (card !== 'J' && (frequency === 4 || frequency + wilds === 4)) {
            hasAFoursome = true;
            break;
        }
    }

    return hasAFoursome;
}

function isFullHouse(frequencies) {
    let wilds = frequencies['J'] || 0;
    let pairs = 0;
    let threes = 0;

    for (let card in frequencies) {
        if (card !== 'J') {
            let frequency = frequencies[card];
            if (frequency === 2) {
                pairs++;
            }
            if (frequency === 3) {
                threes++;
            }
        }
    }

    return (pairs === 2 && wilds >= 1) || (pairs === 1 && threes === 1);
}

function isThreeOfAKind(frequencies) {
    let hasAThreesome = false;
    let wilds = frequencies['J'] || 0;

    for (let [card, frequency] of Object.entries(frequencies)) {
        if (
            (card !== 'J' && (frequency === 3 || frequency + wilds >= 3)) ||
            (card === 'J' && frequency >= 3)
        ) {
            hasAThreesome = true;
            break;
        }
    }

    return hasAThreesome;
}

function isTwoPair(frequencies) {
    let pairs = 0;
    let wilds = frequencies['J'] || 0;

    for (let card in frequencies) {
        if (card !== 'J') {
            let frequency = frequencies[card];
            if (frequency === 2) {
                pairs++;
            } else if (frequency === 1 && wilds > 0) {
                pairs++;
                wilds--;
            }
        }
    }

    return pairs === 2;
}

function isOnePair(frequencies) {
    let pairs = 0;
    let wilds = frequencies['J'] || 0;

    for (let [card, frequency] of Object.entries(frequencies)) {
        if (card !== 'J' && (frequency === 2 || frequency + wilds === 2)) {
            pairs++;
        }
    }

    return pairs >= 1;
}

function getFrequencies(hand) {
    let frequencies = {};
    for (let card of hand) {
        if (frequencies[card]) {
            frequencies[card]++;
        } else {
            frequencies[card] = 1;
        }
    }

    if (frequencies['J'] == null) {
        frequencies['J'] = 0;
    }

    return frequencies;
}

let answer = DATA;
console.log(`Year ${YEAR} Day ${DAY} Puzzle ${PART}: ${answer}`);
