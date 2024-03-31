module.exports = { solve: solve };
const { modInv, modPow } = require('bigint-crypto-utils');

function solve({ lines, rawData }) {
    lines = lines.map((line) => {
        if (line.startsWith('deal into')) {
            return [-1n, -1n];
        } else if (line.startsWith('cut')) {
            return [1n, -1n * BigInt(Number(line.match(/-?\d+/)))];
        } else {
            return [BigInt(Number(line.match(/-?\d+/))), 0n];
        }
    });

    let deckSize = 10007n;
    let position = 2019n;

    function compose(lcfs) {
        let [a, b] = lcfs[0];

        for (let i = 1; i < lcfs.length; i++) {
            const [c, d] = lcfs[i];
            [a, b] = [(a * c) % deckSize, (b * c + d) % deckSize];
        }

        return [a, b];
    }

    let [a, b] = compose(lines);
    const answer = Number((a * position + b) % deckSize);

    return { value: answer };
}
