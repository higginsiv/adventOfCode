const fr = require('../../../tools/fileReader');
const OUTPUT = require('../../../tools/output');
const [YEAR, DAY, PART] = ['2016', '06', '2'];
const DATA = fr.getInput(YEAR, DAY).reduce((total, line) => {
  line.split('').forEach((char, index) => {
    if (total[index] == null) {
      total[index] = {};
    }
    if (total[index][char] == null) {
      total[index][char] = 1;
    } else {
      total[index][char]++;
    }
  });

  return total;
}, []);

let answer = '';
DATA.forEach((char) => {
  let min = Infinity;
  let letter = '';
  Object.keys(char).forEach((key) => {
    if (char[key] < min) {
      min = char[key];
      letter = key;
    }
  });
  answer += letter;
});

OUTPUT.output(YEAR, DAY, PART, answer);
