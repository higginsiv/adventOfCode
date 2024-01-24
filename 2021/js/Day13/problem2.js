const fs = require('fs');
const fr = require('../../../tools/fileReader');
const data = fr.getInput('2021', 13);

let coordinates = data[0].split('\n').map((x) => x.split(',').map((y) => parseInt(y)));
let folds = data[1].split('\n').map((x) => {
    x = x.replace('fold along ', '');
    return x.split('=');
});

let grid = [];
let gridMaxX = 0;
let gridMaxY = 0;

// idk why the prompt does weird x and y coords, but this reverses it
coordinates.forEach((coordinate) => {
    const [x, y] = coordinate;
    if (!grid[y]) {
        grid[y] = [];
    }

    gridMaxX = gridMaxX > y ? gridMaxX : y;
    gridMaxY = gridMaxY > x ? gridMaxY : x;

    grid[y][x] = true;
});

for (let foldI = 0; foldI < folds.length; foldI++) {
    let fold = folds[foldI];
    let [foldDir, foldIndex] = fold;
    foldIndex = parseInt(foldIndex);

    let foldedGrid = [];
    if (foldDir === 'x') {
        grid.forEach((line, index) => {
            for (let i = 0; i < foldIndex; i++) {
                if (!foldedGrid[index]) {
                    foldedGrid[index] = [];
                }
                foldedGrid[index][i] = line[i] || line[foldIndex + (foldIndex - i)];
            }
        });
    } else {
        for (let i = 0; i < grid.length; i++) {
            if (i >= foldIndex) {
                break;
            }
            for (let j = 0; j < gridMaxX; j++) {
                if (!foldedGrid[i]) {
                    foldedGrid[i] = [];
                }

                foldedGrid[i][j] =
                    (grid[i] && grid[i][j]) ||
                    (grid[foldIndex + (foldIndex - i)] && grid[foldIndex + (foldIndex - i)][j]);
            }
        }
    }
    grid = [];
    foldedGrid.forEach((line, index) => {
        line.forEach((point, indexy) => {
            if (!grid[index]) {
                grid[index] = [];
            }
            grid[index][indexy] = point;
        });
    });
}

// map the grid into easier to read symbols
grid = grid.map((line) => {
    return line.map((point) => {
        return point ? '*' : '';
    });
});

// prettify the grid so that you can read the characters
let toPrint = '';
grid.forEach((x) => {
    let print = '';
    x.forEach((y) => {
        if (y === '*') {
            print += '*';
        } else {
            print += ' ';
        }
    });
    toPrint += print;
    toPrint += '\n';
});

// standard out line wraps when you don't want. Instead print to a file
fs.writeFileSync('./js/Day13/output.txt', toPrint);

console.log('Day 13 Puzzle 2: ' + 'located in output.txt');
