const fr = require('../../../tools/fileReader');
const OUTPUT = require('../../../tools/output');
const [YEAR, DAY, PART] = ['2016', '03', '1'];

let answer = fr
    .getInput(YEAR, DAY)
    .map((x) => x.match(/\d+/g).map(Number))
    .reduce((total, current) => {
        let [a, b, c] = current;
        if (a + b > c && a + c > b && b + c > a) {
            total++;
        }
        return total;
    }, 0);

OUTPUT.output(YEAR, DAY, PART, answer);
