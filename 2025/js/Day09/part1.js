import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    lines = lines.map((line) => line.split(',').map(Number));

    let answer = 0;

    for (let i = 0; i < lines.length; i++) {
        for (let j = i + 1; j < lines.length; j++) {
            const area =
                (Math.abs(lines[i][0] - lines[j][0]) + 1) *
                (Math.abs(lines[i][1] - lines[j][1]) + 1);
            if (area > answer) {
                answer = area;
            }
        }
    }
    return new Solution(answer);
}
