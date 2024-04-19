module.exports = { solve: solve };
const CREATE_HASH = require('node:crypto').createHash;

function solve({ lines, rawData }) {
    const DATA = rawData;

    let password = '';
    let index = 0;

    while (password.length < 8) {
        const HASH = CREATE_HASH('md5').update(`${DATA}${index}`).digest('hex');

        if (HASH.startsWith('00000')) {
            password += HASH[5];
        }
        index++;
    }

    return { value: password };
}
