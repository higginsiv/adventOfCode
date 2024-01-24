const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2022', '24', '1'];
const data = fr.getInput(year, day).map((x) => {
  x = x.split('');
  return x;
});

const VALLEY_ROWS = data.length - 2;
const VALLEY_COLS = data[0].length - 2;
const VALLEY_START = 1;
const VALLEY_WALL = '#';
const [START_ROW, START_COL] = [0, 1];
const [END_ROW, END_COL] = [data.length - 1, data[0].length - 2];
const [L_BLIZ, R_BLIZ, U_BLIZ, D_BLIZ] = ['<', '>', '^', 'v'];

let points = Array.from(Array(data.length), (x) => Array(data[0].length));

class Point {
  blizzVertTurns = new Set();
  blizzHorTurns = new Set();
  minStepsToReach = new Map();
  globalMin = Infinity;
  isGoal = false;

  constructor(blizzVertTurns, blizzHorTurns) {
    this.blizzVertTurns = blizzVertTurns;
    this.blizzHorTurns = blizzHorTurns;
  }
}
let goalPoint = new Point(new Set(), new Set());
goalPoint.isGoal = true;
points[END_ROW][END_COL] = goalPoint;
let startPoint = new Point(new Set(), new Set());
startPoint.globalMin = 0;
startPoint.minStepsToReach.set('0.0', Infinity);
points[START_ROW][START_COL] = startPoint;

for (let row = VALLEY_START; row <= VALLEY_ROWS; row++) {
  for (let col = VALLEY_START; col <= VALLEY_COLS; col++) {
    let blizzVertTurns = new Set();
    let blizzHorTurns = new Set();
    for (let pRow = VALLEY_START; pRow <= VALLEY_ROWS; pRow++) {
      let el = data[pRow][col];
      if (el === U_BLIZ) {
        let turns = pRow - row;
        if (turns < 0) {
          turns = VALLEY_ROWS + turns;
        }
        blizzVertTurns.add(turns);
      } else if (el === D_BLIZ) {
        let turns = row - pRow;
        if (turns < 0) {
          turns = VALLEY_ROWS + turns;
        }
        blizzVertTurns.add(turns);
      }
    }
    for (let pCol = VALLEY_START; pCol <= VALLEY_COLS; pCol++) {
      let el = data[row][pCol];
      if (el === L_BLIZ) {
        let turns = pCol - col;
        if (turns < 0) {
          turns = VALLEY_COLS + turns;
        }
        blizzHorTurns.add(turns);
      } else if (el === R_BLIZ) {
        let turns = col - pCol;
        if (turns < 0) {
          turns = VALLEY_COLS + turns;
        }
        blizzHorTurns.add(turns);
      }
    }
    points[row][col] = new Point(blizzVertTurns, blizzHorTurns);
  }
}

function findGoal(row, col, turns) {
  let point = points[row][col];
  let state = (turns % VALLEY_ROWS) + '.' + (turns % VALLEY_COLS);
  point.minStepsToReach.get(state);
  if (point.minStepsToReach.get(state) == null || point.minStepsToReach.get(state) > turns) {
    point.minStepsToReach.set(state, turns);
    if (point.globalMin > turns) {
      point.globalMin = turns;
    }
    turns++;
    if (!point.isGoal && turns < points[END_ROW][END_COL].globalMin) {
      // Moves are cardinal + wait
      isValidMove(row + 1, col, turns) && findGoal(row + 1, col, turns);
      isValidMove(row - 1, col, turns) && findGoal(row - 1, col, turns);
      isValidMove(row, col + 1, turns) && findGoal(row, col + 1, turns);
      isValidMove(row, col - 1, turns) && findGoal(row, col - 1, turns);
      isValidMove(row, col, turns) && findGoal(row, col, turns);
    }
  }
}

function isValidMove(newRow, newCol, turns) {
  let rowInBounds = newRow >= 0 && data[newRow][newCol] !== VALLEY_WALL;
  let noHorBlizz = rowInBounds && !points[newRow][newCol].blizzHorTurns.has(turns % VALLEY_COLS);
  let noVertBlizz = rowInBounds && !points[newRow][newCol].blizzVertTurns.has(turns % VALLEY_ROWS);
  return rowInBounds && noHorBlizz && noVertBlizz;
}

findGoal(START_ROW, START_COL, 0);
const answer = points[END_ROW][END_COL].globalMin;
console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
