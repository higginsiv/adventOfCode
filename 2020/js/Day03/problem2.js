console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2020', '03', '2'];
const data = fr.getInput(year, day).map((x) => x.split(''));
const COLS = data[0].length;
const ROWS = data.length;
const TREE = '#';

let answer = 1;

let slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

while (slopes.length > 0) {
  const [COL_SLOPE, ROW_SLOPE] = slopes.shift();
  let collisions = 0;
  let row = 0;
  let col = 0;
  while (row < ROWS) {
    if (data[row][col] === TREE) {
      collisions++;
    }
    row = row + ROW_SLOPE;
    col = (col + COL_SLOPE) % COLS;
  }
  answer = answer * collisions;
}

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();
