const fr = require('../../../tools/fileReader');
const [YEAR, DAY, PART] = ["2023","04","1"];
const DATA = fr.getInput(YEAR,DAY).reduce((acc, line) => {
    line = line.replace(/\s+/g, ' ');
    line = line.split(': ');
    let numbers = line[1].split(' | ');
    let winners = numbers[0].split(' ').map(x => parseInt(x));
    let chances = numbers[1].split(' ').map(x => parseInt(x));

    let winNum = 0;
    winners.forEach((winner) => {
        if (chances.includes(winner)) {
            winNum++;
        }
    });

    return acc + ((winNum > 0) ? Math.pow(2, winNum - 1) : 0);
}, 0);

let answer = DATA;
console.log(`Year ${YEAR} Day ${DAY} Puzzle ${PART}: ${answer}`);