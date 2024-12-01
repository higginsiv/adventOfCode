import { Solution } from '../../../tools/solution.js';

export default function solve({ lines, rawData }) {
    const left = [];
    const right = [];
    lines.forEach((line) => {
        const [l, r] = line.split('   ').map((x) => parseInt(x));
        left.push(l);
        right.push(r);
    });
    
    const frequencies = new Map();
    let answer = 0;
    for (let i = 0; i < right.length; i++) {
        const newFrequency = (frequencies.get(right[i]) ?? 0) + 1;
        frequencies.set(right[i], newFrequency);
    }

    for (let i = 0; i < left.length; i++) {
        const frequency = frequencies.get(left[i]) ?? 0;
        answer += left[i] * frequency;
    }
    return new Solution(answer);
}
