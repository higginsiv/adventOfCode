const fr = require('../../../tools/fileReader');
const [YEAR, DAY, PART] = ['2023', '03', '1'];
const DATA = fr.getInput(YEAR, DAY).map((line) => line.split(''));

let parts = [];
let symbolsLocations = [];

class Part {
    num;
    locations = [];
    constructor(num, locations) {
        this.num = num;
        this.locations = locations;
    }
}

let sum = 0;
for (let i = 0; i < DATA.length; i++) {
    let numberString = '';
    let locations = [];
    let num;
    for (let j = 0; j < DATA[i].length; j++) {
        if (/\d/.test(DATA[i][j])) {
            numberString += DATA[i][j];
            locations.push([i, j]);
        } else {
            if (numberString !== '') {
                num = parseInt(numberString);
                parts.push(new Part(num, [...locations]));

                numberString = '';
                locations = [];
            }

            if (DATA[i][j] !== '.') {
                symbolsLocations.push(`${i}|${j}`);
            }
        }
    }
    if (numberString !== '') {
        num = parseInt(numberString);
        parts.push(new Part(num, [...locations]));

        numberString = '';
        locations = [];
    }
}

parts.forEach((part) => {
    let adjacent = false;
    part.locations.forEach((location) => {
        let [x, y] = location;
        let adjacentPoints = [
            `${x}|${y + 1}`,
            `${x}|${y - 1}`,
            `${x + 1}|${y}`,
            `${x - 1}|${y}`,
            `${x + 1}|${y + 1}`,
            `${x - 1}|${y - 1}`,
            `${x + 1}|${y - 1}`,
            `${x - 1}|${y + 1}`,
        ];

        adjacentPoints.forEach((point) => {
            if (symbolsLocations.includes(point)) {
                adjacent = true;
            }
        });
    });
    if (adjacent) {
        sum += part.num;
    }
});

let answer = sum;
console.log(`Year ${YEAR} Day ${DAY} Puzzle ${PART}: ${answer}`);
