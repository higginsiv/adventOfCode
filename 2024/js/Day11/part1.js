import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    const BLINKS = 25;
    let stones = lines[0].split(' ').map(Number);

    for (let i = 0; i < BLINKS; i++) {
        const newStones = [];
        for (let stone of stones) {
            if (stone === 0) {
                newStones.push(1);
                continue;
            } 

            const stoneString = stone.toString();
            if (stoneString.length % 2 === 0) {
                newStones.push(Number(stoneString.slice(0, stoneString.length / 2)));
                newStones.push(Number(stoneString.slice(stoneString.length / 2)));
                continue;
            }
            newStones.push(stone * 2024);
        }
        stones = newStones;
    }
    const answer = stones.length;
    return new Solution(answer);
}