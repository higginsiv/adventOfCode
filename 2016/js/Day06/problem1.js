const fr = require('../../../tools/fileReader');
const OUTPUT = require('../../../tools/output');
const [YEAR, DAY, PART] = ['2016', '06', '1'];
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
    let max = 0;
    let letter = '';
    Object.keys(char).forEach((key) => {
        if (char[key] > max) {
            max = char[key];
            letter = key;
        }
    });
    answer += letter;
});

OUTPUT.output(YEAR, DAY, PART, answer);
