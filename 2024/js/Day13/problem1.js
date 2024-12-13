import { Solution } from '#tools/solution.js';
import { EOL } from 'os';

export default function solve({ lines, rawData }) {
    const [A_COST, B_COST] = [3, 1];
    const answer = rawData
        .split(EOL + EOL)
        .map((group) => {
            group = group.split(EOL).map((line) => line.match(/\d+/g).map(Number));
            return {
                a: { x: group[0][0], y: group[0][1] },
                b: { x: group[1][0], y: group[1][1] },
                prize: { x: group[2][0], y: group[2][1] },
            };
        })
        .reduce((acc, group) => {
            let cheapest = Infinity;
            for (let i = 0; i <= 100; i++) {
                for (let j = 0; j <= 100; j++) {
                    if (
                        group.a.x * i + group.b.x * j === group.prize.x &&
                        group.a.y * i + group.b.y * j === group.prize.y
                    ) {
                        const cost = i * A_COST + j * B_COST;
                        if (cost < cheapest) {
                            cheapest = cost;
                        }
                    }
                }
            }

            return acc + (cheapest === Infinity ? 0 : cheapest);
        }, 0);

    return new Solution(answer);
}
