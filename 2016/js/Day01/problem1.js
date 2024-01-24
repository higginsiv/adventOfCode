const fr = require('../../../tools/fileReader');
const OUTPUT = require('../../../tools/output');
const [YEAR, DAY, PART] = ['2016', '01', '1'];
const [LEFT, RIGHT] = ['L', 'R'];
const [NORTH, EAST, SOUTH, WEST] = [0, 1, 2, 3];
const DIRECTIONS = [NORTH, EAST, SOUTH, WEST];

let x = 0;
let y = 0;
let direction = NORTH;

const DATA = fr
  .getInput(YEAR, DAY, ', ')
  .map((x) => {
    const direction = x[0];
    const distance = parseInt(x.substring(1));
    return { direction, distance };
  })
  .forEach((movement) => {
    switch (movement.direction) {
      case LEFT:
        direction = DIRECTIONS[(direction + 3) % 4];
        break;
      case RIGHT:
        direction = DIRECTIONS[(direction + 1) % 4];
        break;
    }

    switch (direction) {
      case NORTH:
        y += movement.distance;
        break;
      case EAST:
        x += movement.distance;
        break;
      case SOUTH:
        y -= movement.distance;
        break;
      case WEST:
        x -= movement.distance;
        break;
    }
  });

let answer = Math.abs(x) + Math.abs(y);
OUTPUT.output(YEAR, DAY, PART, answer);
