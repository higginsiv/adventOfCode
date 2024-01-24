console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2020', '05', '1'];
const data = fr.getInput(year, day).map((x) => x.split(''));
const [FRONT, BACK, LEFT, RIGHT] = ['F', 'B', 'L', 'R'];
const ROWS = 127;
const COLS = 7;
const ROW_MULT = 8;

let answer = data.reduce((highest, curr) => {
  let rowMin = 0;
  let rowMax = ROWS;
  let colMin = 0;
  let colMax = COLS;

  while (rowMin !== rowMax || colMin !== colMax) {
    let midRow = rowMin + Math.floor((rowMax - rowMin) / 2);
    let midCol = colMin + Math.floor((colMax - colMin) / 2);
    let dir = curr.shift();
    switch (dir) {
      case FRONT:
        rowMax = midRow;
        break;
      case BACK:
        rowMin = midRow + 1;
        break;
      case LEFT:
        colMax = midCol;
        break;
      case RIGHT:
        colMin = midCol + 1;
        break;
    }
  }

  let id = rowMin * ROW_MULT + colMin;
  return highest > id ? highest : id;
}, 0);

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();
