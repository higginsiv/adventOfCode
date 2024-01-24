const fr = require('../../../tools/fileReader');
const data = fr
  .getInput('2021', '07', ',')
  .map((x) => parseInt(x))
  .sort((x, y) => x - y);

let bestDelta = null;
for (let i = data[0]; i < data[data.length - 1]; i++) {
  const delta = data.reduce((previous, current) => {
    const dif = Math.abs(current - i);
    // formula for sum 1..n is n(n+1) * .5
    const summation = dif * (dif + 1) * 0.5;
    return (previous += summation);
  }, 0);

  if (bestDelta === null || delta < bestDelta) {
    bestDelta = delta;
  }
}

console.log('Day 7 Puzzle 2: ' + bestDelta);
