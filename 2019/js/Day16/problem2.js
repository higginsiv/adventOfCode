export default function solve({ lines, rawData }) {
    const REPEATS = 10000;

    let input = rawData.split('').map(Number);
    const offset = Number(input.slice(0, 7).join(''));
    const inputLength = input.length;
    const realLength = inputLength * 10000;
    const PHASES = 100;

    let real = [];

    for (let i = 0; i < REPEATS; i++) {
        real.push(...input);
    }

    for (let phase = 0; phase < PHASES; phase++) {
        for (let i = realLength - 1; i >= offset; i--) {
            real[i] = (real[i] + (real[i + 1] || 0)) % 10;
        }
    }

    const answer = real.slice(offset, offset + 8).join('');
    return { value: answer };
}
