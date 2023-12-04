const fr = require('../../../tools/fileReader');
const [YEAR, DAY, PART] = ["2023","04","2"];

let cards = new Map();
fr.getInput(YEAR,DAY).forEach((line, index) => {
    if (cards.get(index) === undefined) {
        cards.set(index, 0);
    }
    cards.set(index, cards.get(index) + 1);

    line = line.replace(/\s+/g, ' ');
    line = line.split(': ');
    let numbers = line[1].split(' | ');
    let winners = numbers[0].split(' ').map(x => parseInt(x));
    let chances = numbers[1].split(' ').map(x => parseInt(x));

    let winNum = 0;
    chances.forEach((chance) => {
        if (winners.includes(chance)) {
            winNum++;
        }
    });

    for (let j = 0; j < cards.get(index); j++) {
        for (let i = 1; i <= winNum; i++) {
            cards.set(index + i, (cards.get(index + i) != null ? cards.get(index + i) : 0) + 1);
        }
    }
});

let answer = 0;
cards.forEach((value) => {
    answer += value;
});

console.log(`Year ${YEAR} Day ${DAY} Puzzle ${PART}: ${answer}`);