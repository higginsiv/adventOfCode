console.time();
const { EOL } = require('os');
const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2020', '22', '2'];
const [PLAYER_ONE, PLAYER_TWO] = [1, 2];

let [player1, player2] = fr.getInput(year, day, EOL + EOL).map((x) => {
    x = x.split(EOL);
    x.shift();
    x = x.map((y) => parseInt(y));
    return x;
});

playGame(player1, player2, new Set());

let winningDeck = player1.length !== 0 ? player1 : player2;

let answer = 0;
for (let i = 0; i < winningDeck.length; i++) {
    let value = winningDeck[i];
    answer += (winningDeck.length - i) * value;
}

function playGame(player1, player2, deckSetups) {
    while (player1.length > 0 && player2.length > 0) {
        let deckSetup = player1.join() + '|' + player2.join();
        if (deckSetups.has(deckSetup)) {
            return PLAYER_ONE;
        } else {
            deckSetups.add(deckSetup);
        }

        let winner;
        let card1 = player1.shift();
        let card2 = player2.shift();

        if (player1.length >= card1 && player2.length >= card2) {
            winner = playGame(player1.slice(0, card1), player2.slice(0, card2), new Set());
        } else {
            winner = card1 > card2 ? PLAYER_ONE : PLAYER_TWO;
        }

        if (winner === PLAYER_ONE) {
            player1.push(card1, card2);
        } else {
            player2.push(card2, card1);
        }
    }

    return player1.length > player2.length ? PLAYER_ONE : PLAYER_TWO;
}

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();
