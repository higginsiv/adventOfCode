const BOARD_SIZE = 10;
const GOAL = 21;
const PLAYER_ONE = 1;
const PLAYER_TWO = 0;
let cache = new Map();
const dieDistrubtion = new Map([
    [3, 1],
    [4, 3],
    [5, 6],
    [6, 7],
    [7, 6],
    [8, 3],
    [9, 1],
]);

export default function solve({ lines, rawData }) {
    let [player1, player2] = lines.map((line) => line.match(/\d+/g).map(Number)[1]);

    let player1Wins = play(player1, 0, player2, 0, true);
    let player2Wins = play(player2, 0, player1, 0, false);

    const answer = player1Wins > player2Wins ? player1Wins : player2Wins;
    return { value: answer };
}

function play(player1Location, player1Score, player2Location, player2Score, player1Turn) {
    if (player1Score >= GOAL) {
        return PLAYER_ONE;
    }

    if (player2Score >= GOAL) {
        return PLAYER_TWO;
    }

    const key = `${player1Location},${player1Score},${player2Location},${player2Score},${player1Turn}`;
    if (cache.has(key)) {
        return cache.get(key);
    }

    let wins = 0;
    for (let i = 3; i <= 9; i++) {
        if (player1Turn) {
            const newPlayer1Location = ((player1Location + i - 1) % BOARD_SIZE) + 1;
            wins +=
                dieDistrubtion.get(i) *
                play(
                    newPlayer1Location,
                    player1Score + newPlayer1Location,
                    player2Location,
                    player2Score,
                    !player1Turn,
                );
        } else {
            const newPlayer2Location = ((player2Location + i - 1) % BOARD_SIZE) + 1;
            wins +=
                dieDistrubtion.get(i) *
                play(
                    player1Location,
                    player1Score,
                    newPlayer2Location,
                    player2Score + newPlayer2Location,
                    !player1Turn,
                );
        }
    }

    cache.set(key, wins);
    return wins;
}
