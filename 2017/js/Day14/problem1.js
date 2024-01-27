module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const { knotHash } = require('../Day10/problem2');
    let answer = 0;
    for (let i = 0; i < 128; i++) {
        const hash = knotHash(`${rawData}-${i}`.split('').map((x) => x.charCodeAt(0)));
        answer += hash
            .split('')
            .map((x) => parseInt(x, 16).toString(2).padStart(4, '0'))
            .join('')
            .split('')
            .filter((x) => x === '1').length;
    }
    return { value: answer };
}
