const fr = require('../../../tools/fileReader');
const [year, day, part] = ["2021","25","1"];

const [EMPTY, EAST, SOUTH] = [0, 1, 2];
let data = fr.getInput(year,day).map(x => x.split('').map(y => y === '.' ? 0 : y === '>' ? 1 : 2));

let moved = true;
let steps = 0;

while (moved) {
    moved = false;
    steps++;

    // Move East Side
    for (let i = 0; i < data.length; i++) {
        let lastCanMove = data[i][0] === EMPTY;
        for (let j = 0; j < data[i].length; j++) {
            let cuke = data[i][j];
            let canMove = (j === data[i].length - 1 && lastCanMove) || (j < data[i].length - 1 && data[i][j + 1] === EMPTY);
            if (cuke === EAST && canMove) {
                moved = true;
                data[i][(j + 1) % data[i].length] = EAST;
                data[i][j] = EMPTY
                j++;
            }
        }
    }

    // Move South Side
    for (let i = 0; i < data[0].length; i++) {
        let lastCanMove = data[0][i] === EMPTY;
        for (let j = 0; j < data.length; j++) {
            let cuke = data[j][i];
            let canMove = (j === data.length - 1 && lastCanMove) || (j < data.length - 1 && data[j + 1][i] === EMPTY);
            if (cuke === SOUTH && canMove) {
                moved = true;
                data[(j + 1) % data.length][i] = SOUTH;
                data[j][i] = EMPTY
                j++
            }
        }
    }
}

function print() {
    for (let i = 0; i < data.length; i++) {
        let row = '';
        for (let j = 0; j < data[i].length; j++) {
            row += data[i][j];
        }
        console.log(row)
    }
    console.log('************')
}

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + steps);