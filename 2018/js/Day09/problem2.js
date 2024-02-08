module.exports = { solve: solve };

function solve({ lines, rawData }) {
    let [players, lastMarble] = rawData.match(/\d+/g).map(Number);
    lastMarble *= 100;
    let elves = Array(players).fill(0);
    let currentPlayer = 0;

    let currentMarble = { value: 0 };
    currentMarble.next = currentMarble;
    currentMarble.prev = currentMarble;

    for (let i = 1; i <= lastMarble; i++) {
        if (i % 23 === 0) {
            elves[currentPlayer] += i;
            for (let j = 0; j < 7; j++) {
                currentMarble = currentMarble.prev;
            }
            elves[currentPlayer] += currentMarble.value;
            currentMarble.prev.next = currentMarble.next;
            currentMarble.next.prev = currentMarble.prev;
            currentMarble = currentMarble.next;
        } else {
            const newMarble = { value: i };
            newMarble.next = currentMarble.next.next;
            newMarble.prev = currentMarble.next;
            currentMarble.next.next.prev = newMarble;
            currentMarble.next.next = newMarble;
            currentMarble = newMarble;
        }

        currentPlayer = (currentPlayer + 1) % players;
    }
    const answer = elves.reduce((max, score) => (max >= score ? max : score), 0);
    return { value: answer };
}
