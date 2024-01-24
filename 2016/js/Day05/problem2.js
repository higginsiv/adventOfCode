const fr = require('../../../tools/fileReader');
const OUTPUT = require('../../../tools/output');
const CREATE_HASH = require('node:crypto').createHash;
const [YEAR, DAY, PART] = ['2016', '05', '2'];
const DATA = fr.getInput(YEAR, DAY)[0];

let password = new Map();
let index = 0;

while (password.size < 8) {
    const HASH = CREATE_HASH('md5').update(`${DATA}${index}`).digest('hex');

    if (
        HASH.startsWith('00000') &&
        !isNaN(HASH[5]) &&
        HASH[5] < 8 &&
        !password.has(parseInt(HASH[5]))
    ) {
        password.set(parseInt(HASH[5]), HASH[6]);
    }
    index++;
}

let answer = '';
for (let i = 0; i < 8; i++) {
    answer += password.get(i);
}

OUTPUT.output(YEAR, DAY, PART, answer);
