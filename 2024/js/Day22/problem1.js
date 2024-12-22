import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    const [MAX_SECRET, PRUNE_NUM] = [2000n, 16777216n];

    const answer = lines
        .map((line) => BigInt(line))
        .reduce((acc, secret) => {
            for (let i = 0n; i < MAX_SECRET; i++) {
                let mixIn = xor(secret, secret * 64n);
                secret = mixIn % PRUNE_NUM;

                mixIn = xor(secret, secret / 32n);
                secret = mixIn % PRUNE_NUM;

                mixIn = secret * 2048n;
                secret = xor(secret, mixIn) % PRUNE_NUM;
            }

            return acc + secret;
        }, 0n);
    return new Solution(Number(answer));
}

function xor(a, b) {
    return a ^ b;
}
