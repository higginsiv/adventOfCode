const fr = require('../../../tools/fileReader');
const {EOL} = require('os');
const [year, day, part] = ["2022","22","2"];
const data = fr.getInput(year,day, EOL + EOL);

const [FREE, WALL, VOID] = ['.', '#', ' '];
const [EAST, SOUTH, WEST, NORTH] = [0, 1, 2, 3];
const [CLOCK, COUNTER] = ['R', 'L'];
const [ONE, TWO, THREE, FOUR, FIVE, SIX] = [1, 2, 3, 4, 5, 6];
const [SIZE, START, MAX] = [50, 0, 49];

let face1 = Array.from(Array(SIZE), x => Array(SIZE));
let face2 = Array.from(Array(SIZE), x => Array(SIZE));
let face3 = Array.from(Array(SIZE), x => Array(SIZE));
let face4 = Array.from(Array(SIZE), x => Array(SIZE));
let face5 = Array.from(Array(SIZE), x => Array(SIZE));
let face6 = Array.from(Array(SIZE), x => Array(SIZE));

let faces = new Map(
    [[1, face1],
    [2, face2],
    [3, face3],
    [4, face4],
    [5, face5],
    [6, face6]]
)
// console.log(face1);
let grid = data[0].split(EOL).map(x => x.split(''));
let moves = data[1].replaceAll(CLOCK, ' R ').replaceAll(COUNTER, ' L ').split(' ').map(x => {
    if (x === CLOCK || x === COUNTER) {
        return x;
    } else {
        return parseInt(x);
    }
})

buildCube();
// printFace(3);
// printFace(4);
// printFace(5);
// printFace(6);

function buildCube() {
    grid = data[0].split(EOL).map(x => x.split(''));

    let startCol = grid[0].indexOf(FREE) < grid[0].indexOf(WALL) && grid[0].indexOf(FREE) !== -1 ? grid[0].indexOf(FREE) : grid[0].indexOf(WALL);
    for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {
            face1[row][col] = grid[row][col + startCol];
            face2[row][col] = grid[row][col + startCol + SIZE];

            face3[row][col] = grid[row + SIZE][col + startCol];

            face4[row][col] = grid[row + SIZE + SIZE][col];
            face5[row][col] = grid[row + SIZE + SIZE][col + startCol];

            face6[row][col] = grid[row + SIZE + SIZE + SIZE][col];
        }
    }
}

function printFace(faceNum) {
    let face = faces.get(faceNum);
    console.log('Printing: ' + faceNum);
    console.log('Rows: ' + face.length + ' Cols: ' + face[0].length);
    for (let i = 0; i < face.length; i++) {
        let row = '';
        for (let j = 0; j < face.length; j++) {
            row += face[i][j];
        }
        console.log(row);
    }
    console.log(EOL);
}

function wrap() {
    let destFace;
    let destDir;
    let destRow;
    let destCol;
    if (pos.face === ONE) {
        if (pos.dir === EAST) {
            destFace = TWO;
            destDir = EAST;
            destRow = pos.row;
            destCol = START;
        } else if (pos.dir === SOUTH) {
            destFace = THREE;
            destDir = SOUTH;
            destRow = START;
            destCol = pos.col;
        } else if (pos.dir === WEST) {
            destFace = FOUR;
            destDir = EAST;
            destRow = MAX - pos.col;
            destCol = START
        } else if (pos.dir === NORTH) {
            destFace = SIX;
            destDir = EAST;
            destRow = pos.col;
            destCol = START;
        }
    } else if (pos.face === TWO) {
        if (pos.dir === EAST) {
            destFace = FIVE;
            destDir = WEST;
            destRow = MAX - pos.row;
            destCol = MAX;
        } else if (pos.dir === SOUTH) {
            destFace = THREE;
            destDir = WEST;  
            destRow = pos.col;
            destCol = MAX;
        } else if (pos.dir === WEST) {
            destFace = ONE;
            destDir = WEST;
            destRow = pos.row;
            destCol = MAX;
        } else if (pos.dir === NORTH) {
            destFace = SIX;
            destDir = NORTH;
            destRow = MAX;
            destCol = pos.col;
        }
    } else if (pos.face === THREE) {
        if (pos.dir === EAST) {
            destFace = TWO;
            destDir = NORTH;
            destRow = START;
            destCol = pos.row;
        } else if (pos.dir === SOUTH) {
            destFace = FIVE;
            destDir = SOUTH;
            destRow = START;
            destCol = pos.col;
        } else if (pos.dir === WEST) {
            destFace = FOUR;
            destDir = SOUTH;
            destRow = START;
            destCol = pos.row;
        } else if (pos.dir === NORTH) {
            destFace = ONE;
            destDir = NORTH;
            destRow = MAX;
            destCol = pos.col;
        }
    } else if (pos.face === FOUR) {
        if (pos.dir === EAST) {
            destFace = FIVE;
            destDir = EAST;
            destRow = pos.row;
            destCol = START;
        } else if (pos.dir === SOUTH) {
            destFace = SIX;
            destDir = SOUTH;
            destRow = START;
            destCol = pos.col;
        } else if (pos.dir === WEST) {
            destFace = ONE;
            destDir = EAST;
            destRow = MAX - ROW;
            destCol = START;
        } else if (pos.dir === NORTH) {
            destFace = THREE;
            destDir = EAST;
            destRow = pos.col;
            destCol = START;
        }
    } else if (pos.face === FIVE) {
        if (pos.dir === EAST) {
            destFace = TWO;
            destDir = WEST;
            destRow = MAX - pos.row;
            destCol = MAX;
        } else if (pos.dir === SOUTH) {
            destFace = SIX;
            destDir = WEST;
            destRow = pos.col;
            destCol = MAX;
        } else if (pos.dir === WEST) {
            destFace = FOUR;
            destDir = WEST;
            destRow = pos.row;
            destCol = MAX;
        } else if (pos.dir === NORTH) {
            destFace = THREE;
            destDir = NORTH;
            destRow = MAX;
            destCol = pos.col;
        }
    } else if (pos.face === SIX) {
        if (pos.dir === EAST) {
            destFace = FIVE;
            destDir = NORTH;
            destRow = MAX;
            destCol = pos.row;
        } else if (pos.dir === SOUTH) {
            destFace = TWO;
            destDir = WEST;
            destRow = pos.col;
            destCol = MAX;
        } else if (pos.dir === WEST) {
            destFace = ONE;
            destDir = SOUTH;
            destRow = START;
            destCol = pos.row;
        } else if (pos.dir === NORTH) {
            destFace = FOUR;
            destDir = NORTH;
            destRow = MAX;
            destCol = pos.col;
        }
    }

    if (faces.get(destFace)[destRow][destCol] === FREE) {
        pos.face = destFace;
        pos.row = destRow;
        pos.col = destCol;
        pos.dir = destDir;
        return true;
    }
    return false;
}

class Position {
    row;
    col;
    face;
    dir;
    constructor(row, col, dir, face) {
        this.row = row;
        this.col = col;
        this.face = face;
        this.dir = dir;
    }
}

let pos = new Position(0, grid[0].indexOf(FREE), EAST, 1);
moves.forEach(x => {
    if (x === CLOCK) {
        pos.dir = (pos.dir + 1) % 4;
    } else if (x === COUNTER) {
        pos.dir = pos.dir - 1 < 0 ? 3 : pos.dir - 1;
    } else if (pos.dir === EAST) {
        for (let i = 0; i < x; i++) {
            let tarCol = pos.col + 1 >= grid[pos.row].length ? 0 : pos.col + 1;
            let next = grid[pos.row][tarCol];
            if (next === VOID || next == null) {
                pos.col = grid[pos.row].indexOf(FREE) < grid[pos.row].indexOf(WALL) ? grid[pos.row].indexOf(FREE) : pos.col;
                if (grid[pos.row].indexOf(FREE) > grid[pos.row].indexOf(WALL)) {
                    break;
                }
            } else if (next === WALL) {
                break;
            } else {
                pos.col = tarCol;
            }
        }
    } else if (pos.dir === SOUTH) {
        for (let i = 0; i < x; i++) {
            let tarRow = pos.row + 1 >= grid.length ? 0 : pos.row + 1;
            let next = grid[(pos.row + 1) % grid.length][pos.col];
            if (next === VOID || next == null) {
                for (let j = 0; j < grid.length; j++) {
                    if (grid[j][pos.col] === WALL) {
                        break;
                    } else if (grid[j][pos.col] === FREE) {
                        pos.row = j;
                        break;
                    }
                }
            } else if (next === WALL) {
                break;
            } else {
                pos.row = tarRow;
            }
        }
    } else if (pos.dir === WEST) {
        for (let i = 0; i < x; i++) {
            let tarCol = pos.col - 1 >= 0 ? pos.col - 1 : grid[pos.row].length - 1;
            let next = grid[pos.row][tarCol];
            if (next === VOID || next == null) {
                pos.col = grid[pos.row].lastIndexOf(FREE) > grid[pos.row].lastIndexOf(WALL) ? grid[pos.row].lastIndexOf(FREE) : pos.col;
                if (grid[pos.row].lastIndexOf(FREE) <= grid[pos.row].lastIndexOf(WALL)) {
                    break;
                }
            } else if (next === WALL) {
                break;
            } else {
                pos.col = tarCol;
            }
        }
    } else if (pos.dir === NORTH) {
        for (let i = 0; i < x; i++) {
            let tarRow = pos.row - 1 >= 0 ? pos.row - 1 : grid.length - 1;
            let next = grid[tarRow][pos.col];
            if (next === VOID || next == null) {
                for (let j = grid.length - 1; j >= 0; j--) {
                    if (grid[j][pos.col] === WALL) {
                        break;
                    } else if (grid[j][pos.col] === FREE) {
                        pos.row = j;
                        break;
                    }
                }
            } else if (next === WALL) {
                break;
            } else {
                pos.row = tarRow;
            }
        }
    }
});

let answer = (1000 * (pos.row + 1)) + (4 * (pos.col + 1)) + pos.dir;
console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);


//  12
//  3
// 45
// 6