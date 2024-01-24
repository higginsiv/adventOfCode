const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2022', '09', '2'];
const data = fr
  .getInput(year, day)
  .map((x) => x.split(' ').map((y, index) => (index === 0 ? y : parseInt(y))));

let knots = Array.from(Array(10), () => {
  return { x: 0, y: 0 };
});

console.log(knots.length);
let tailVisits = new Set(['0.0']);

data.forEach(([dir, amount]) => {
  switch (dir) {
    case 'U':
      move('y', amount);
      break;
    case 'D':
      move('y', -amount);
      break;
    case 'L':
      move('x', -amount);
      break;
    case 'R':
      move('x', amount);
      break;
  }
});

function move(axis, delta) {
  const increment = delta > 0 ? 1 : -1;
  for (let i = 0; i < Math.abs(delta); i++) {
    knots[0][axis] += increment;
    for (let j = 0; j < knots.length - 1; j++) {
      let head = knots[j];
      let tail = knots[j + 1];

      if (!isTouching(head, tail)) {
        const xDif = head.x - tail.x;
        const yDif = head.y - tail.y;
        const xInc = xDif > 0 ? 1 : xDif < 0 ? -1 : 0;
        const yInc = yDif > 0 ? 1 : yDif < 0 ? -1 : 0;
        tail.x += xInc;
        tail.y += yInc;

        if (j === 8) {
          tailVisits.add(tail['x'].toString() + '.' + tail['y'].toString());
        }
      }
    }
  }
}

function isTouching(head, tail) {
  return Math.abs(head.x - tail.x) <= 1 && Math.abs(head.y - tail.y) <= 1;
}

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + tailVisits.size);
