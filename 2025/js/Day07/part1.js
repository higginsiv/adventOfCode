import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    const START = 'S';
    const SPLITTER = '^';
    const BEAM = '|';
    const EMPTY = '.';

    const startLocation = {
        row: 0,
        col: lines[0].indexOf(START),
    };

    const grid = lines.map((line) => line.split(''));

    let splits = 0;
    const queue = [{ ...startLocation }];

    while (queue.length > 0) {
        const current = queue.shift();
        if (current.row > grid.length - 1 || current.col < 0 || current.col > grid[0].length - 1) {
            continue;
        }
        const currentChar = grid[current.row][current.col];
        if (currentChar === EMPTY || currentChar === START) {
            grid[current.row][current.col] = BEAM;
            queue.push({ row: current.row + 1, col: current.col });
        } else if (currentChar === SPLITTER) {
            splits++;
            const left = { row: current.row, col: current.col - 1 };
            const right = { row: current.row, col: current.col + 1 };

            if (grid[left.row][left.col] !== BEAM) {
                queue.push(left);
            }

            if (grid[right.row][right.col] !== BEAM) {
                queue.push(right);
            }
        }
    }
    const answer = splits;
    return new Solution(answer);
}
