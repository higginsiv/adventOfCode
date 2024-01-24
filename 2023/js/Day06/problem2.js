const fr = require('../../../tools/fileReader');
const [YEAR, DAY, PART] = ['2023', '06', '2'];
const [TIME, DISTANCE] = fr.getInput(YEAR, DAY).map((x) => {
  x = x.replace(/\s+/g, '');
  return x.match(/\d+/g).map((x) => parseInt(x))[0];
});

const x1 = (TIME + Math.sqrt(TIME * TIME - 4 * DISTANCE)) / 2;
const x2 = (TIME - Math.sqrt(TIME * TIME - 4 * DISTANCE)) / 2;
const wins = Math.floor(x1) - Math.floor(x2);

console.log(`Year ${YEAR} Day ${DAY} Puzzle ${PART}: ${wins}`);
