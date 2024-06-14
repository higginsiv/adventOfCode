module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const [TIMES, DISTANCES] = lines.map((x) => x.match(/\d+/g).map((x) => parseInt(x)));

    const answer = TIMES.reduce((total, curr, index) => {
        const TIME = curr;
        const DISTANCE = DISTANCES[index];
        const x1 = (TIME + Math.sqrt(TIME * TIME - 4 * DISTANCE)) / 2;
        const x2 = (TIME - Math.sqrt(TIME * TIME - 4 * DISTANCE)) / 2;
        const wins = Math.floor(x1) - Math.floor(x2);

        return total * wins;
    }, 1);
    return { value: answer };
}
