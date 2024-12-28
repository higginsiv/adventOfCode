import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    const matches = rawData.match(/mul\(\d{1,3},\d{1,3}\)|don't\(\)|do\(\)/g);

    let answer = 0;
    let mulEnabled = true;
    matches.forEach((match) => {
        if (match === 'do()') {
            mulEnabled = true;
        } else if (match === "don't()") {
            mulEnabled = false;
        } else if (mulEnabled) {
            const [a, b] = match.match(/\d+/g);
            answer += a * b;
        }
    });

    return new Solution(answer);
}
