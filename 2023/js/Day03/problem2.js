const fr = require('../../../tools/fileReader');
const [YEAR, DAY, PART] = ["2023","03","2"];
const DATA = fr.getInput(YEAR,DAY).map(line => line.split(''));

let parts = [];
let symbolsLocations = [];
let symbolLocationToPartNum = new Map();
let id = 0;
let idToPart = new Map();

class Part {
    id;
    num;
    locations = [];
    constructor(num, locations, id) {
        this.num = num;
        this.locations = locations;
        this.id = id;
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
            locations.push([i,j]);
        } else {
            if (numberString !== '') {
                num = parseInt(numberString);
                let p = new Part(num, [...locations], id);
                idToPart.set(id, p);
                id++;
                parts.push(p);

                numberString = '';
                locations = [];
            }

            if (DATA[i][j] === '*') {
                symbolsLocations.push(`${i}|${j}`);
            }
        }
    }
    if (numberString !== '') {
        num = parseInt(numberString);
        let p = new Part(num, [...locations], id);
        idToPart.set(id, p);
        id++;
        parts.push(p);

        numberString = '';
        locations = [];
    }
}

parts.forEach(part => {
    let adjacent = false;
    part.locations.forEach(location => {
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

        adjacentPoints.forEach(point => {
            if (symbolsLocations.includes(point)) {

                adjacent = true;
                if (!symbolLocationToPartNum.has(point)) {
                    symbolLocationToPartNum.set(point, new Set());
                }
                symbolLocationToPartNum.get(point).add(part.id);
            }
        })
    })
})

symbolLocationToPartNum.forEach((parts) => {
    if (parts.size == 2) {
        parts = [...parts];
        sum += (idToPart.get(parts[0]).num * idToPart.get(parts[1]).num);
    }
})

let answer = sum;
console.log(`Year ${YEAR} Day ${DAY} Puzzle ${PART}: ${answer}`);