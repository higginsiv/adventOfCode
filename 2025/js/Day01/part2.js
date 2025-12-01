import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    const MULTS = new Map([
        ['R', 1],
        ['L', -1]
    ]);
    let answer = 0;
    let dial = 50;
    lines.map(line => {
        return {
            dir: MULTS.get(line[0]),
            value: parseInt(line.slice(1), 10)
        }
    }).forEach(({ dir, value }) => {
        let oldDial = dial;
        dial += dir * (value % 100);
        if (dial < 0) {
            dial += 100;
            if (oldDial !== 0) {
                answer++;
            }
        } else if (dial >= 100) {
            dial -= 100;
            if (oldDial !== 0) {
                answer++;
            }
        } else if (dial === 0) {
            answer++;
        }

        const timesLooped = Math.floor(value / 100);
        answer += timesLooped;
    });

    return new Solution(answer);
}