import { createHash } from 'node:crypto';
const CREATE_HASH = createHash;

export default function solve({ lines, rawData }) {
    const DATA = rawData;

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
    return { value: answer };
}
