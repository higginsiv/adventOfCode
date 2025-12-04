import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    const ROLLS = '@';
    const DELTAS = [
        [0, -1],
        [0, 1],
        [-1, 0],
        [1, 0],
        [-1, -1],
        [-1, 1],
        [1, 1],
        [1, -1],
    ];
    const grid = lines.map((line) => line.split(''));

    let answer = 0;
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[0].length; y++) {
            if (grid[x][y] === ROLLS && hasLessThanFourNeighbors(x, y)) {
                answer++;
            }
        }
    }

    function hasLessThanFourNeighbors(x, y) {
        let rolls = 0;
        for (let i = 0; i < DELTAS.length; i++) {
            const [dx, dy] = DELTAS[i];
            const newX = x + dx;
            const newY = y + dy;

            if (newX < 0 || newX >= grid.length || newY < 0 || newY >= grid[0].length) {
                continue;
            }
            const neighbor = grid[newX][newY];
            if (neighbor === ROLLS) {
                rolls++;
                if (rolls >= 4) {
                    return false;
                }
            }
        }
        return true;
    }

    return new Solution(answer);
}
