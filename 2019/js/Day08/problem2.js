console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2019', '08', '2'];
const BLACK = '⬛';
const WHITE = '⬜';
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

const data = fr
    .getInput(year, day, '')
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

printGrid();

function printGrid() {
    for (let i = 0; i < grid.length; i++) {
        let row = '';
        for (let j = 0; j < grid[i].length; j++) {
            row += grid[i][j];
        }
        console.log(row);
    }
}

console.timeEnd();
