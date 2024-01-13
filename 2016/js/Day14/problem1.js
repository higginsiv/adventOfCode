module.exports = {solve: solve};

function solve({lines, rawData}) {
    const CREATE_HASH = require('node:crypto').createHash;

    let hashes = {};
    let index = 0;
    let numKeys = 0;

    while (numKeys < 64) {
        let HASH;
        if (hashes[index]) {
            HASH = hashes[index];
        } else {
            HASH = CREATE_HASH('md5').update(`${rawData}${index}`).digest('hex');
            hashes[index] = HASH;
        }

        let matches = HASH.match(/(.)\1\1/);
        if (matches && matches[1]) {
            let char = matches[1];
            let regex = new RegExp(`${char}{5}`);

            for (let i = 1; i <= 1000; i++) {
                let HASH2 = hashes[index+i];
                if (!HASH2) {
                    HASH2 = CREATE_HASH('md5').update(`${rawData}${index+i}`).digest('hex');
                    hashes[index+i] = HASH2;
                }

                if (HASH2.match(regex)) {
                    numKeys++;
                    break;
                }
            }
        }

        index++;
    }

    let answer = index - 1;
    return {value: answer};
}