import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    const regex = /^(.+)\1+$/;

    const answer = rawData.split(',').reduce((invalidCount, line) => {
        const [start, end] = line.split('-').map((x) => parseInt(x));
        for (let i = start; i <= end; i++) {
            let numString = i.toString();
            if (regex.test(numString)) {
                invalidCount += i;
            }
        }
        return invalidCount;
    }, 0);
    return new Solution(answer);
}
