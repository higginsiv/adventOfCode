import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    const UP = 'UP';
    const DOWN = 'DOWN';

    const answer = lines
        .map((line) => {
            line = line.split(' ').map(Number);
            return line;
        })
        .filter((line) => {
            let mode;
            if (line[0] > line[1]) {
                mode = DOWN;
            } else if (line[0] < line[1]) {
                mode = UP;
            } else {
                return false;
            }

            for (let i = 0; i < line.length - 1; i++) {
                if (mode === UP && line[i] >= line[i + 1]) {
                    return false;
                } else if (mode === DOWN && line[i] <= line[i + 1]) {
                    return false;
                } else if (Math.abs(line[i] - line[i + 1]) > 3) {
                    return false;
                }
            }
            return true;
        }).length;
    return new Solution(answer);
}
