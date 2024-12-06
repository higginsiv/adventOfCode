import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    let grid = lines.map((line) => line.split(''));
    let answer = 0;

    for (let i = 1; i < grid.length - 1; i++) {
        for (let j = 1; j < grid[0].length - 1; j++) {
            if (grid[i][j] === 'A') {
                const diag1 = [grid[i - 1][j - 1], grid[i + 1][j + 1]].sort().join('');
                const diag2 = [grid[i - 1][j + 1], grid[i + 1][j - 1]].sort().join('');
                if (diag1 === 'MS' && diag2 === 'MS') {
                    answer++;
                }
            }
        }
    }

    return new Solution(answer);
}
