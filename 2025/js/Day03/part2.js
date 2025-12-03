import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    const NUM_DIGITS = 12;
    const answer = lines
        .map((line) => line.split('').map(x => parseInt(x)))
        .reduce((total, curr) => {
            let numbers = [];
            let indexOfLast = -1;
            while (numbers.length < NUM_DIGITS) {
                numbers.push(0);
                for (
                    let i = indexOfLast + 1;
                    i < curr.length - (NUM_DIGITS - numbers.length);
                    i++
                ) {
                    if (curr[i] > numbers[numbers.length - 1]) {
                        numbers[numbers.length - 1] = curr[i];
                        indexOfLast = i;
                    }
                }
            }
            return total + parseInt(numbers.join(''));
        }, 0);
    return new Solution(answer);
}
