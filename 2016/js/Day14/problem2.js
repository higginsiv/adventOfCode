module.exports = { solve: solve };

function solve({ lines, rawData }) {
  const CREATE_HASH = require('node:crypto').createHash;

  const LOOPS = 2017;

  let index = 0;
  let keyIndices = [];

  let last1000 = Array(1000).fill(null);

  while (keyIndices.length < 64) {
    let hash = `${rawData}${index}`;
    for (let i = 0; i < LOOPS; i++) {
      hash = getHash(hash);
    }

    let fiveMatches = hash.match(/(.)\1\1\1\1/g);
    fiveMatches = fiveMatches ? fiveMatches.map((match) => match[0]) : null;

    let firstThree = hash.match(/(.)\1\1/);

    let localIndex = index % 1000;
    if (fiveMatches) {
      last1000.forEach((item) => {
        if (item && item.firstThree && fiveMatches.includes(item.firstThree)) {
          keyIndices.push(item.trueIndex);
        }
      });
    }
    last1000[localIndex] = {
      hash: hash,
      firstThree: firstThree ? firstThree[1] : null,
      fiveMatches: fiveMatches,
      trueIndex: index,
    };

    index++;
  }

  function getHash(str) {
    return CREATE_HASH('md5').update(str).digest('hex');
  }

  let answer = keyIndices.sort((a, b) => a - b)[63];
  return { value: answer };
}
