const fr = require('../../../tools/fileReader');
const [YEAR, DAY, PART] = ['2023', '06', '1'];
const [TIMES, DISTANCES] = fr
    .getInput(YEAR, DAY)
    .map((x) => x.match(/\d+/g).map((x) => parseInt(x)));

let answer = TIMES.reduce((total, curr, index) => {
    const TIME = curr;
    const DISTANCE = DISTANCES[index];
    const x1 = (TIME + Math.sqrt(TIME * TIME - 4 * DISTANCE)) / 2;
    const x2 = (TIME - Math.sqrt(TIME * TIME - 4 * DISTANCE)) / 2;
    const wins = Math.floor(x1) - Math.floor(x2);

    return total * wins;
}, 1);

console.log(`Year ${YEAR} Day ${DAY} Puzzle ${PART}: ${answer}`);
