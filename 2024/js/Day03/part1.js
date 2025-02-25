import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    const answer = rawData
        .match(/mul\(\d{1,3},\d{1,3}\)/g)
        .map((match) => {
            const [a, b] = match.match(/\d+/g);
            return a * b;
        })
        .reduce((acc, val) => acc + val, 0);

    return new Solution(answer);
}
