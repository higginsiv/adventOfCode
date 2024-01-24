console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2020', '11', '2'];

const [EMPTY, FILLED, FLOOR] = ['L', '#', '.'];
let data = fr.getInput(year, day).map((x) => x.split(''));

let seatChanged = true;

while (seatChanged) {
  seatChanged = false;
  let next = JSON.parse(JSON.stringify(data));

  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[row].length; col++) {
      let occupiedVisible = getOccupiedVisible(row, col);
      if (data[row][col] === EMPTY && occupiedVisible === 0) {
        next[row][col] = FILLED;
        seatChanged = true;
      } else if (data[row][col] === FILLED && occupiedVisible >= 5) {
        next[row][col] = EMPTY;
        seatChanged = true;
      }
    }
  }

  data = next;
}

function getOccupiedVisible(row, col) {
  let occupiedVisible = 0;
  // expand out on col
  occupiedVisible += numberVisibleInDir(row, col, -1, 0);
  occupiedVisible += numberVisibleInDir(row, col, 1, 0);

  // expand out on row
  occupiedVisible += numberVisibleInDir(row, col, 0, -1);
  occupiedVisible += numberVisibleInDir(row, col, 0, 1);

  // expand out on top left to bottom right diagonal
  occupiedVisible += numberVisibleInDir(row, col, -1, -1);
  occupiedVisible += numberVisibleInDir(row, col, 1, 1);

  // expand out on bottom left to top right diagonal
  occupiedVisible += numberVisibleInDir(row, col, 1, -1);
  occupiedVisible += numberVisibleInDir(row, col, -1, 1);

  return occupiedVisible;
}

function numberVisibleInDir(row, col, rowMod, colMod) {
  row += rowMod;
  col += colMod;

  if (row < 0 || row >= data.length || col < 0 || col >= data[0].length) {
    return 0;
  }

  if (data[row][col] === FILLED) {
    return 1;
  } else if (data[row][col] === EMPTY) {
    return 0;
  }

  return numberVisibleInDir(row, col, rowMod, colMod);
}

let answer = data.reduce((total, curr) => {
  let inRow = curr.reduce((rowTotal, seat) => {
    return rowTotal + (seat === FILLED ? 1 : 0);
  }, 0);
  return total + inRow;
}, 0);

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();
