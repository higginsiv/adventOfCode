const fr = require('../../../tools/fileReader');
const OUTPUT = require('../../../tools/output');
const [YEAR, DAY, PART] = ['2016', '09', '1'];

let decompressed = '';
const DATA = fr.getInput(YEAR, DAY)[0].trim();

let i = 0;
while (i < DATA.length) {
  if (DATA[i] === '(') {
    let marker = '';
    i++;
    while (DATA[i] !== ')') {
      marker += DATA[i];
      i++;
    }
    let [numChars, numRepeat] = marker.split('x').map(Number);
    i++;

    let toRepeat = DATA.substr(i, numChars);
    for (let j = 0; j < numRepeat; j++) {
      decompressed += toRepeat;
    }
    i += numChars;
  } else {
    decompressed += DATA[i];
    i++;
  }
}

let answer = decompressed.length;
OUTPUT.output(YEAR, DAY, PART, answer);
