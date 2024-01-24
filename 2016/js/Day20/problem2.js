module.exports = { solve: solve };

function solve({ lines, rawData }) {
  const condenseRanges = require('../../../tools/math').condenseRanges;
  lines = lines.map((line) => line.split('-').map(Number)).sort((a, b) => a[0] - b[0]);
  lines = condenseRanges(lines);

  let answer = lines.reduce((available, [start, end]) => {
    return available - (end - start + 1);
  }, 4294967296);

  return { value: answer };
}
