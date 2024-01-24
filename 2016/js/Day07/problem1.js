const fr = require('../../../tools/fileReader');
const OUTPUT = require('../../../tools/output');
const [YEAR, DAY, PART] = ['2016', '07', '1'];

const regexInvalid = /\[[^\]]*?(\w)(?!\1)(\w)\2\1[^\]]*?\]/;
const regexValid = /(\w)(?!\1)(\w)\2\1/;

const answer = fr.getInput(YEAR, DAY).reduce((total, line) => {
    if (!regexInvalid.test(line) && regexValid.test(line)) {
        total++;
    }
    return total;
}, 0);

OUTPUT.output(YEAR, DAY, PART, answer);
