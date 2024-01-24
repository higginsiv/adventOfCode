const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2021', '17', '2'];
const [MIN_X, MAX_X, MIN_Y, MAX_Y] = fr.getInput(year, day).map((x) => {
  x = x.replace('target area: x=', '');
  x = x.replaceAll('..', ' ');
  x = x.replace(',', '');
  x = x.replace('y=', '');
  x = x.split(' ').map((y) => parseInt(y));
  return x;
})[0];

const [xStart, yStart] = [0, 0];

class Velocity {
  xs = new Set();
  y;
  steps;
  constructor(y, steps) {
    this.y = y;
    this.steps = steps;
  }
}

const yVelMax = Math.abs(MIN_Y);
const yVelMin = MIN_Y;

let velocities = [];
let stepsToXs = new Map();
let uniqueVelocities = new Set();
for (let yVel = yVelMin; yVel <= yVelMax; yVel++) {
  let vel = yVel;
  let pos = yStart;
  let steps = 0;
  while (true) {
    steps++;
    pos += vel;
    if (pos >= MIN_Y && pos <= MAX_Y) {
      velocities.push(new Velocity(yVel, steps));
    }
    if (pos <= MIN_Y) {
      break;
    }
    vel--;
  }
}

velocities.forEach((vel) => {
  let cachedXs = stepsToXs.get(vel.steps);
  if (cachedXs != null) {
    vel.xs = cachedXs;
  } else {
    for (let x = 0; x <= MAX_X; x++) {
      const xVel = findXPosition(x, vel.steps);
      if (xVel >= MIN_X && xVel <= MAX_X) {
        vel.xs.add(x);
      }
    }
    stepsToXs.set(vel.steps, vel.xs);
  }
  vel.xs.forEach((xVel) => {
    uniqueVelocities.add(xVel + '.' + vel.y);
  });
});

function findXPosition(vel, steps) {
  let pos = xStart;
  while (steps > 0) {
    pos += vel;
    if (vel > 0) {
      vel--;
    }
    steps--;
  }
  return pos;
}

/** Idk the math name but imagine a factorial that adds intstead of multiplying */
function factorialAdditionWithLimits(int, limit) {
  let res = 0;
  while (int > 0 && limit > 0) {
    res += int;
    int--;
    limit--;
  }
  return res;
}

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + uniqueVelocities.size);
