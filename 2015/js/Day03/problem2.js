console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2015', '03', '2'];

const [NORTH, EAST, SOUTH, WEST] = ['^', '>', 'v', '<'];

let curX = 0;
let curY = 0;
let roboX = 0;
let roboY = 0;

let locations = new Map();
locations.set(makeKey(curX, curY), 2);

fr.getInput(year, day, '').forEach((x, index) => {
  const roboTurn = index % 2 == 1;
  switch (x) {
    case NORTH:
      roboTurn ? roboY++ : curY++;
      break;
    case EAST:
      roboTurn ? roboX++ : curX++;
      break;
    case SOUTH:
      roboTurn ? roboY-- : curY--;
      break;
    case WEST:
      roboTurn ? roboX-- : curX--;
      break;
    default:
      console.log('f');
  }

  let key = makeKey(curX, curY);
  let presentCount = locations.get(key);
  presentCount = presentCount == null ? 1 : presentCount + 1;
  locations.set(key, presentCount);

  let roboKey = makeKey(roboX, roboY);
  let roboPresentCount = locations.get(roboKey);
  roboPresentCount = roboPresentCount == null ? 1 : roboPresentCount + 1;
  locations.set(roboKey, roboPresentCount);
});

let answer = locations.size;

function makeKey(x, y) {
  return x + '.' + y;
}
console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();
