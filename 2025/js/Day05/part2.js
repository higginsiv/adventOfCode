import { Solution } from '#tools/solution.js';
import { EOL } from 'os';
export default function solve({ lines, rawData }) {
    let ranges = rawData.split(EOL + EOL)[0];

    ranges = ranges.split(EOL).map((line) => {
        return line.split('-').map(Number);
    });

    ranges.sort((a, b) => a[0] - b[0]);

    let combined = [];
    let currentStart = ranges[0][0];
    let currentEnd = ranges[0][1];

    for (let i = 1; i < ranges.length; i++) {
        const [start, end] = ranges[i];
        if (start <= currentEnd + 1) {
            currentEnd = Math.max(currentEnd, end);
        } else {
            combined.push([currentStart, currentEnd]);
            currentStart = start;
            currentEnd = end;
        }
    }
    combined.push([currentStart, currentEnd]);

    const answer = combined.reduce((sum, [min, max]) => sum + (max - min + 1), 0);
    return new Solution(answer);
}
