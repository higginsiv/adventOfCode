module.exports = { solve: solve };
const { floor, abs } = Math;
function solve({ lines, rawData }) {
    let input = rawData.split('').map(Number);
    const offset = Number(input.slice(0, 7).join(''));
    const inputLength = input.length;
    const realLength = inputLength * 10000;
    console.log('inputLength', inputLength);
    console.log(realLength)
    console.log(offset)
    console.log(realLength - offset)
    console.log(offset % inputLength)
    console.log(realLength / inputLength)
    const PHASES = 100;
    const basePattern = [0, 1, 0, -1];

    // let output = [];
    // for (let i = realLength - 1; i >= offset; i--) {
    //     let previousValue = output[i + 1] || 0;
    //     output[i] = (input[i % inputLength] + previousValue) % 10;
    // }

    // for (let i = offset + inputLength; i >= offset; i--) {
    //     output[i % inputLength] = output[i];
    // }
    let output = new Map();
    for (let phase = 0; phase < PHASES; phase++) {
        for (let i = realLength - 1; i >= offset; i--) {
            let previousValue = output.get(i + 1) || 0;
            output.set(i, (input[i % inputLength] + previousValue) % 10);
        }
    }

    const answer = Array.from(output.values()).slice(0, 8).join('');
    return { value: answer };
}

function getPatternValueForIndex(valueIndex, patternIndex, pattern) {
    return pattern[floor(valueIndex / patternIndex) % pattern.length];
}

// Notes
// - Only need to keep track of numbers after the offset because the rest will be multiplied by 0
// can add up all numbers *1 from the offset since the *1 part of the pattern will repeat until the end since the pattern is [0, 1, 0, -1]


// output starts at 149 into input
// given output[i] = (input[i] + output[i+1]) % 10 but need to adjust for the offset


// 93281714 too high