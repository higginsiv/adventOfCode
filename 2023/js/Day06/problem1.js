const fr = require('../../../tools/fileReader');
const [YEAR, DAY, PART] = ["2023","06","1"];
const [TIMES, DISTANCES] = fr.getInput(YEAR,DAY).map(x => x.match(/\d+/g).map(x => parseInt(x)));

let answer = TIMES.reduce((total, curr, index) => {
    const maxTime = curr;
    let wins = 0;
    for (let i = 0; i <= maxTime; i++) {
        const distance = (i * (maxTime - i));
        if (distance >= DISTANCES[index]) {
            wins++;
        }
    }
    return total * wins;
}, 1);

console.log(`Year ${YEAR} Day ${DAY} Puzzle ${PART}: ${answer}`);