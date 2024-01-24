console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2020', '11', '1'];

const [EMPTY, FILLED, FLOOR] = ['L', '#', '.'];
let data = fr.getInput(year, day).map((x) => x.split(''));

let rounds = 0;
let seatChanged = true;
while (seatChanged) {
    seatChanged = false;
    let next = JSON.parse(JSON.stringify(data));

    for (let row = 0; row < data.length; row++) {
        for (let col = 0; col < data[row].length; col++) {
            let occupiedAdjacent = getOccupiedAdjacent(row, col);
            if (data[row][col] === EMPTY && occupiedAdjacent === 0) {
                next[row][col] = FILLED;
                seatChanged = true;
            } else if (data[row][col] === FILLED && occupiedAdjacent >= 4) {
                next[row][col] = EMPTY;
                seatChanged = true;
            }
        }
    }

    data = next;
    rounds++;
}

function getOccupiedAdjacent(row, col) {
    let occupiedAdjacent = 0;
    if (row > 0 && col > 0 && data[row - 1][col - 1] === FILLED) {
        occupiedAdjacent++;
    }
    if (row > 0 && data[row - 1][col] === FILLED) {
        occupiedAdjacent++;
    }
    if (row > 0 && col < data[row].length - 1 && data[row - 1][col + 1] === FILLED) {
        occupiedAdjacent++;
    }
    if (col > 0 && data[row][col - 1] === FILLED) {
        occupiedAdjacent++;
    }
    if (col < data[row].length - 1 && data[row][col + 1] === FILLED) {
        occupiedAdjacent++;
    }
    if (row < data.length - 1 && col > 0 && data[row + 1][col - 1] === FILLED) {
        occupiedAdjacent++;
    }
    if (row < data.length - 1 && data[row + 1][col] === FILLED) {
        occupiedAdjacent++;
    }
    if (row < data.length - 1 && col < data[row].length - 1 && data[row + 1][col + 1] === FILLED) {
        occupiedAdjacent++;
    }

    return occupiedAdjacent;
}

let answer = data.reduce((total, curr) => {
    let inRow = curr.reduce((rowTotal, seat) => {
        return rowTotal + (seat === FILLED ? 1 : 0);
    }, 0);
    return total + inRow;
}, 0);

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();
