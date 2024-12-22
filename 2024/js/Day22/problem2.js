import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    const [MAX_SECRET, PRUNE_NUM] = [2000n, 16777216n];

    let sequenceToPrices = new Map();
    lines
        .map((line) => BigInt(line))
        .forEach((secret, index) => {
            let lastPrice = getPrice(secret);
            let lastFourChanges = [];

            for (let i = 0n; i < MAX_SECRET; i++) {
                let mixIn = xor(secret, secret * 64n);
                secret = mixIn % PRUNE_NUM;

                mixIn = xor(secret, secret / 32n);
                secret = mixIn % PRUNE_NUM;

                mixIn = secret * 2048n;
                secret = xor(secret, mixIn) % PRUNE_NUM;
                let price = getPrice(secret);

                lastFourChanges.push(price - lastPrice);
                if (lastFourChanges.length > 4) {
                    lastFourChanges.shift();
                }

                if (lastFourChanges.length === 4) {
                    let key = lastFourChanges.join(',');
                    let prices = sequenceToPrices.get(key) || [];
                    if (prices[index] === undefined) {
                        prices[index] = price;
                        sequenceToPrices.set(key, prices);
                    }
                }

                lastPrice = price;
            }
        });

    const answer = [...sequenceToPrices].reduce((acc, [key, prices]) => {
        let bananas = prices.reduce((acc, price) => acc + price, 0n);
        return acc > bananas ? acc : bananas;
    }, 0n);

    return new Solution(Number(answer));
}

function xor(a, b) {
    return a ^ b;
}

function getPrice(secret) {
    return secret % 10n;
}
