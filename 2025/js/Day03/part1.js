import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    const answer = lines
        .map((line) => line.split('').map((x) => parseInt(x)))
        .reduce((total, curr) => {
            let highest = -Infinity;
            let second = -Infinity;
            for (let i = 0; i < curr.length - 1; i++) {
                const num = curr[i];
                if (num > highest) {
                    highest = num;
                    second = -Infinity;
                    continue;
                } else if (num > second) {
                    second = num;
                    continue;
                }
            }
            if (curr[curr.length - 1] > second) {
                second = curr[curr.length - 1];
            }
            return total + 10 * highest + second;
        }, 0);
    return new Solution(answer);
}
