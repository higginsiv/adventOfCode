const fr = require('../../../tools/fileReader');
const [YEAR, DAY, PART] = ['2023', '04', '2'];

let cards = new Map();
fr.getInput(YEAR, DAY).forEach((line, index) => {
    if (cards.get(index) === undefined) {
        cards.set(index, 0);
    }
    cards.set(index, cards.get(index) + 1);

    line = line.replace(/\s+/g, ' ');
    line = line.split(': ');
    let numbers = line[1].split(' | ');
    let winners = numbers[0].split(' ').map((x) => parseInt(x));
    let chances = numbers[1].split(' ').map((x) => parseInt(x));

    let winNum = 0;
    chances.forEach((chance) => {
        if (winners.includes(chance)) {
            winNum++;
        }
    });

    for (let i = 0; i < cards.get(index); i++) {
        for (let j = 1; j <= winNum; j++) {
            cards.set(index + j, (cards.get(index + j) != null ? cards.get(index + j) : 0) + 1);
        }
    }
});

let answer = 0;
cards.forEach((value) => {
    answer += value;
});

console.log(`Year ${YEAR} Day ${DAY} Puzzle ${PART}: ${answer}`);
