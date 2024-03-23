module.exports = { solve: solve };

function solve({ lines, rawData }) {
    let input = rawData.split('').map(Number);
    const offset = Number(input.slice(0, 7).join(''));
    const inputLength = input.length;
    const realLength = inputLength * 10000;
    const PHASES = 100;

    let output = new Map();
    for (let phase = 0; phase < PHASES; phase++) {
        for (let i = realLength - 1; i >= offset; i--) {
            let previousValue = output.get(i + 1) || 0;
            let nextValue;
            if (phase === 0) {
                nextValue = input[i % inputLength];
            } else {
                nextValue = output.get(i);
            }

            output.set(i, (nextValue + previousValue) % 10);
        }
    }

    const answer = Array.from(output.values()).slice(-8).reverse().join('');
    return { value: answer };
}
