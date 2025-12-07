import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    const START = 'S';
    const SPLITTER = '^';
    const EMPTY = '.';

    const startLocation = {
        row: 0,
        col: lines[0].indexOf(START),
    };

    const grid = lines.map((line) => line.split(''));

    const cache = new Map();
    const answer = traverseToEnd(startLocation.row, startLocation.col);

    return new Solution(answer);

    function traverseToEnd(row, col) {
        if (row > grid.length - 1 || col < 0 || col > grid[0].length - 1) {
            return 1;
        }
        const key = `${row},${col}`;
        if (cache.has(key)) {
            return cache.get(key);
        }

        const currentChar = grid[row][col];
        if (currentChar === EMPTY || currentChar === START) {
            const result = traverseToEnd(row + 1, col);
            cache.set(key, result);
            return result;
        } else if (currentChar === SPLITTER) {
            const result = traverseToEnd(row, col - 1) + traverseToEnd(row, col + 1);
            cache.set(key, result);
            return result;
        } else {
            return 0;
        }
    }
}
