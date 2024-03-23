module.exports = { solve: solve };
const { floor, abs } = Math;
function solve({ lines, rawData }) {
    let input = rawData.split('').map(Number);
    const PHASES = 100;
    const basePattern = [0, 1, 0, -1];

    for (let phase = 0; phase < PHASES; phase++) {
        let output = [];
        for (let i = 0; i < input.length; i++) {
            let sum = 0;
            for (let j = 0; j < input.length; j++) {
                const patternValue = getPatternValueForIndex(j + 1, i + 1, basePattern);
                sum += input[j] * patternValue;
            }
            output.push(abs(sum) % 10);
        }
        input = output;
    }

    const answer = input.slice(0, 8).join('');
    return { value: answer };
}

function getPatternValueForIndex(valueIndex, patternIndex, pattern) {
    return pattern[floor(valueIndex / patternIndex) % pattern.length];
}
