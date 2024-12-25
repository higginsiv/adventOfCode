import { Solution } from '#tools/solution.js';
import { EOL } from 'os';

export default function solve({ lines, rawData }) {
    const [PINS, HEIGHT] = [5, 7];
    let keys = [];
    let locks = [];

    rawData.split(EOL + EOL).forEach((group) => {
        let grid = group.split(EOL).map((line) => line.split(''));

        let combo = Array(PINS).fill(0);
        let isKey = grid[0][0] === '.';
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j] === '#') {
                    combo[j]++;
                }
            }
        }

        if (isKey) {
            keys.push(combo);
        } else {
            locks.push(combo);
        }
    });

    locks.sort((a, b) => {
        for (let i = 0; i < PINS; i++) {
            if (a[i] < b[i]) {
                return -1;
            } else if (a[i] > b[i]) {
                return 1;
            }
        }
        return 0;
    });

    keys.sort((a, b) => {
        for (let i = 0; i < PINS; i++) {
            if (a[i] < b[i]) {
                return -1;
            } else if (a[i] > b[i]) {
                return 1;
            }
        }
        return 0;
    });

    const answer = keys.reduce((acc, key) => {
        return (
            acc +
            locks.reduce((acc, lock) => {
                for (let i = 0; i < PINS; i++) {
                    if (key[i] + lock[i] > HEIGHT) {
                        return acc;
                    }
                }
                return acc + 1;
            }, 0)
        );
    }, 0);
    return new Solution(answer);
}
