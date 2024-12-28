import { Solution } from '#tools/solution.js';
import { EOL } from 'os';

export default function solve({ lines, rawData }) {
    const [A_COST, B_COST] = [3, 1];
    const OOPSY = 10000000000000;
    const answer = rawData
        .split(EOL + EOL)
        .map((group) => {
            group = group.split(EOL).map((line) => line.match(/\d+/g).map(Number));
            return {
                a: { x: group[0][0], y: group[0][1] },
                b: { x: group[1][0], y: group[1][1] },
                prize: { x: group[2][0] + OOPSY, y: group[2][1] + OOPSY },
            };
        })
        .reduce((acc, group, index) => {
            // A * y1 + B * y2 = py
            // A = (py - B * y2) / y1

            // (px - B * x2) / x1 = (py - B * y2) / y1
            // (px - B * x2) * y1 = (py - B * y2) * x1
            // px * y1 - B * x2 * y1 = py * x1 - B * y2 * x1
            // px * y1 - py * x1 = B * (x2 * y1 - y2 * x1)
            // B = (px * y1 - py * x1) / (x2 * y1 - y2 * x1)

            const bPresses =
                (group.prize.x * group.a.y - group.prize.y * group.a.x) /
                (group.b.x * group.a.y - group.b.y * group.a.x);

            const aPresses = (group.prize.y - group.b.y * bPresses) / group.a.y;
            let cost = aPresses * A_COST + bPresses * B_COST;

            // If the intersection point does not result in a whole number of presses, this group is invalid
            if (Math.floor(aPresses) !== aPresses || Math.floor(bPresses) !== bPresses) {
                cost = 0;
            }

            return acc + cost;
        }, 0);

    return new Solution(answer);
}
