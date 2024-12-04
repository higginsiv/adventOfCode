import { Solution } from '../../../tools/solution.js';

export default function solve({ lines, rawData }) {
    let grid = lines.map((line) => line.split(''));
    let answer = 0;

    const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1],
    ];

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            const words = getWords(grid, i, j);
            answer += words.filter((word) => word === 'XMAS').length;
        }
    }

    return new Solution(answer);

    function getWords(grid, i, j) {
        const words = [];

        if (grid[i][j] !== 'X') {
            return words;
        }

        directions.forEach(([dx, dy]) => {
            let word = grid[i][j];

            let x = i;
            let y = j;
            for (let i = 0; i < 3; i++) {
                x += dx;
                y += dy;
                if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length) {
                    return;
                }
                word += grid[x][y];
            }
            words.push(word);
        });

        return words;
    }
}
