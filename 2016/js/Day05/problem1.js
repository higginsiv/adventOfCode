const fr = require('../../../tools/fileReader');
const OUTPUT = require('../../../tools/output');
const CREATE_HASH = require('node:crypto').createHash;
const [YEAR, DAY, PART] = ['2016', '05', '1'];
const DATA = fr.getInput(YEAR, DAY)[0];

let password = '';
let index = 0;

while (password.length < 8) {
    const HASH = CREATE_HASH('md5').update(`${DATA}${index}`).digest('hex');

    if (HASH.startsWith('00000')) {
        password += HASH[5];
    }
    index++;
}

OUTPUT.output(YEAR, DAY, PART, password);
