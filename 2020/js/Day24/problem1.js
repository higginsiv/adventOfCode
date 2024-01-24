console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2020', '24', '1'];

const [EAST, WEST, NORTHWEST, NORTHEAST, SOUTHWEST, SOUTHEAST] = ['e', 'w', 'nw', 'ne', 'sw', 'se'];
const ALL = [EAST, WEST, NORTHWEST, NORTHEAST, SOUTHWEST, SOUTHEAST];

let blackTiles = new Set();
const [REF_X, REF_Y] = [0, 0];

const data = fr.getInput(year, day).forEach((line) => {
  let [x, y] = [REF_X, REF_Y];
  line = line.split('');

  while (line.length > 0) {
    let step = line.shift();
    if (!ALL.includes(step)) {
      step += line.shift();
    }

    switch (step) {
      case EAST:
        x += 2;
        break;
      case WEST:
        x -= 2;
        break;
      case NORTHEAST:
        x++;
        y++;
        break;
      case NORTHWEST:
        x--;
        y++;
        break;
      case SOUTHEAST:
        x++;
        y--;
        break;
      case SOUTHWEST:
        x--;
        y--;
    }
  }

  let key = x + '|' + y;
  if (blackTiles.has(key)) {
    blackTiles.delete(key);
  } else {
    blackTiles.add(key);
  }
});

let answer = blackTiles.size;
console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();
