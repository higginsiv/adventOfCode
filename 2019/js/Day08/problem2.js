import { Solution, GridStrategy } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    const BLACK = '0';
    const WHITE = '1';
    const TRANS = 'T';
    const WIDTH = 25;
    const HEIGHT = 6;
    const LAYER_SIZE = WIDTH * HEIGHT;
    let grid = [];
    for (let i = 0; i < HEIGHT; i++) {
        grid[i] = [];
        for (let j = 0; j < WIDTH; j++) {
            grid[i].push(TRANS);
        }
    }

    let row = 0;
    let col = 0;

    const data = rawData
        .split('')
        .map((x) => parseInt(x))
        .forEach((x, index) => {
            if (index % LAYER_SIZE === 0) {
                row = 0;
                col = 0;
            } else if (index % WIDTH === 0) {
                row++;
                col = 0;
            } else {
                col++;
            }

            if (grid[row][col] === TRANS) {
                switch (x) {
                    case 0:
                        grid[row][col] = BLACK;
                        break;
                    case 1:
                        grid[row][col] = WHITE;
                        break;
                }
            }
        });

    return new Solution(grid, new GridStrategy([WHITE]));
}
