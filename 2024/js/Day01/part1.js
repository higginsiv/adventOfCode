import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    const left = [];
    const right = [];
    lines.forEach((line) => {
        const [l, r] = line.split('   ').map((x) => parseInt(x));
        left.push(l);
        right.push(r);
    });
    left.sort((a, b) => a - b);
    right.sort((a, b) => a - b);

    let answer = 0;
    for (let i = 0; i < left.length; i++) {
        answer += Math.abs(left[i] - right[i]);
    }
    return new Solution(answer);
}
