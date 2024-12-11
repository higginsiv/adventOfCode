import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    const BLINKS = 75;
    let stones = new Map();

    lines[0]
        .split(' ')
        .map(Number)
        .forEach((stone) => {
            let stoneCount = stones.get(stone) ?? 0;
            stones.set(stone, stoneCount + 1);
        });

    for (let i = 0; i < BLINKS; i++) {
        const newStones = new Map();
        stones.forEach((count, stone) => {
            if (stone === 0) {
                newStones.set(1, (newStones.get(1) ?? 0) + count);
                return;
            }

            const stoneString = stone.toString();
            if (stoneString.length % 2 === 0) {
                const left = Number(stoneString.slice(0, stoneString.length / 2));
                const right = Number(stoneString.slice(stoneString.length / 2));
                newStones.set(left, (newStones.get(left) ?? 0) + count);
                newStones.set(right, (newStones.get(right) ?? 0) + count);
                return;
            }
            newStones.set(stone * 2024, (newStones.get(stone * 2024) ?? 0) + count);
        });
        stones = newStones;
    }
    const answer = [...stones.entries()].reduce((acc, [stone, count]) => acc + count, 0);
    return new Solution(answer);
}
