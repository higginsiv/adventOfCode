import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    const answer = rawData.split(',').reduce((invalidCount, line) => {
        const [start, end] = line.split('-').map((x) => parseInt(x));
        for (let i = start; i <= end; i++) {
            let numString = i.toString();
            if (i.length % 2 === 1) {
                continue;
            }
            const front = numString.slice(0, numString.length / 2);
            const back = numString.slice(numString.length / 2, numString.length);

            if (front == back) {
                invalidCount += i;
            }
        }
        return invalidCount;
    }, 0);
    return new Solution(answer);
}
