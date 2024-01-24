console.time();
const fr = require('../../../tools/fileReader');

const [year, day, part] = ['2015', '05', '1'];

const VOWELS = ['a', 'e', 'i', 'o', 'u'];

let numNiceStrings = 0;
const data = fr.getInput(year, day).forEach((x) => {
  if (!x.includes('ab') && !x.includes('cd') && !x.includes('pq') && !x.includes('xy')) {
    let vowelCount = 0;
    let hasDouble = false;

    let letters = x.split('');
    for (let i = 0; i < letters.length; i++) {
      if (!hasDouble && i > 0 && letters[i] == letters[i - 1]) {
        hasDouble = true;
      }

      if (VOWELS.includes(letters[i])) {
        vowelCount++;
      }

      if (hasDouble && vowelCount >= 3) {
        numNiceStrings++;
        break;
      }
    }
  }
});

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + numNiceStrings);
console.timeEnd();
