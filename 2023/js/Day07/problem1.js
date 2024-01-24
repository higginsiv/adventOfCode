const fr = require('../../../tools/fileReader');
const [YEAR, DAY, PART] = ['2023', '07', '1'];

const [FIVE, FOUR, FULL, THREE, TWO, ONE, HIGH] = [64, 32, 16, 8, 4, 2, 1];

const cardScores = new Map([
    ['A', 14],
    ['K', 13],
    ['Q', 12],
    ['J', 11],
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

let fiveRegex = /^(.)\1*$/;

class Hand {
    key;
    cards;
    bid;
    score;
    constructor(key, cards, bid, score) {
        this.key = key;
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
        let score = 0;
        if (fiveRegex.test(hand)) {
            score = score | FIVE;
        } else if (isFourOfAKind(handArray)) {
            score = score | FOUR;
        } else if (isFullHouse(handArray)) {
            score = score | FULL;
        } else if (isThreeOfAKind(handArray)) {
            score = score | THREE;
        } else if (isTwoPair(handArray)) {
            score = score | TWO;
        } else if (isOnePair(handArray)) {
            score = score | ONE;
        } else {
            score = score | HIGH;
        }

        return new Hand(hand, handArray, parseInt(x[1]), score);
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

function isFourOfAKind(hand) {
    return (
        hand.filter((x) => x === hand[0]).length === 4 ||
        hand.filter((x) => x === hand[1]).length === 4
    );
}

function isFullHouse(hand) {
    let frequencies = {};
    for (let card of hand) {
        if (frequencies[card]) {
            frequencies[card]++;
        } else {
            frequencies[card] = 1;
        }
    }

    let values = Object.values(frequencies);
    return values.includes(2) && values.includes(3);
}

function isThreeOfAKind(hand) {
    return (
        hand.filter((x) => x === hand[0]).length === 3 ||
        hand.filter((x) => x === hand[1]).length === 3 ||
        hand.filter((x) => x === hand[2]).length === 3
    );
}

// TODO combine this with full house checking
function isTwoPair(hand) {
    let frequencies = {};
    for (let card of hand) {
        if (frequencies[card]) {
            frequencies[card]++;
        } else {
            frequencies[card] = 1;
        }
    }

    let pairs = 0;
    for (let frequency of Object.values(frequencies)) {
        if (frequency === 2) {
            pairs++;
        }
    }

    return pairs === 2;
}

function isOnePair(hand) {
    return (
        hand.filter((x) => x === hand[0]).length === 2 ||
        hand.filter((x) => x === hand[1]).length === 2 ||
        hand.filter((x) => x === hand[2]).length === 2 ||
        hand.filter((x) => x === hand[3]).length === 2
    );
}

let answer = DATA;
console.log(`Year ${YEAR} Day ${DAY} Puzzle ${PART}: ${answer}`);
