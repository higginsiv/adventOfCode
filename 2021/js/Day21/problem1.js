const BOARD_SIZE = 10;
const DIE_SIZE = 100;
const GOAL = 1000;
const PLAYER_ONE = 0;
const PLAYER_TWO = 1;

export default function solve({ lines, rawData }) {
    let [player1, player2] = lines.map((line) => line.match(/\d+/g).map(Number)[1]);
    const gameResult = playGame(player1, player2, GOAL, DIE_SIZE, BOARD_SIZE);
    const loserScore = gameResult.players.filter((player) => player.score < GOAL)[0].score;

    const answer = loserScore * gameResult.totalDiceRolled;
    return { value: answer };
}

function playGame(player1, player2, goal, dieSize, boardSize) {
    let players = [
        { player: 1, score: 0, location: player1 },
        { player: 2, score: 0, location: player2 },
    ];

    let turn = PLAYER_ONE;
    let lastDie = 0;
    let totalDiceRolled = 0;
    while (true) {
        const die1 = getNextDie(lastDie, dieSize);
        const die2 = getNextDie(die1, dieSize);
        const die3 = getNextDie(die2, dieSize);

        lastDie = die3;
        totalDiceRolled += 3;
        const dieSum = die1 + die2 + die3;

        const landingSpot = getLandingSpot(players[turn].location, dieSum, boardSize);

        players[turn].score += landingSpot;
        players[turn].location = landingSpot;

        if (players[turn].score >= goal) {
            return { players, totalDiceRolled };
        } else {
            turn = turn === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;
        }
    }
}

function getNextDie(last, dieSize) {
    return (last % dieSize) + 1;
}

function getLandingSpot(current, sum, boardSize) {
    return (current + sum) % boardSize;
}
