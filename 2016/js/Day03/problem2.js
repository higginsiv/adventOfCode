const fr = require('../../../tools/fileReader');
const OUTPUT = require('../../../tools/output');
const [YEAR, DAY, PART] = ['2016', '03', '2'];

const DATA = fr.getInput(YEAR, DAY).map((x) => x.match(/\d+/g).map(Number));

let answer = 0;
for (let i = 0; i < DATA.length; i += 3) {
    for (let j = 0; j < 3; j++) {
        let [a, b, c] = [DATA[i][j], DATA[i + 1][j], DATA[i + 2][j]];
        if (a + b > c && a + c > b && b + c > a) {
            answer++;
        }
    }
}

OUTPUT.output(YEAR, DAY, PART, answer);
