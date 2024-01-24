console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2020', '03', '1'];
const data = fr.getInput(year, day).map((x) => x.split(''));
const COLS = data[0].length;
const ROWS = data.length;
const TREE = '#';

let row = 0;
let col = 0;
let collisions = 0;
while (row < ROWS) {
  if (data[row][col] === TREE) {
    collisions++;
  }
  row = row + 1;
  col = (col + 3) % COLS;
}
let answer = collisions;

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();
