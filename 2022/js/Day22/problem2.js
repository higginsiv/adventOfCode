import { EOL } from 'os';
export default function solve({ lines, rawData }) {
    const data = rawData.split(EOL + EOL);

    const [FREE, WALL] = ['.', '#'];
    const [EAST, SOUTH, WEST, NORTH] = [0, 1, 2, 3];
    const [CLOCK, COUNTER] = ['R', 'L'];
    const [ONE, TWO, THREE, FOUR, FIVE, SIX] = [1, 2, 3, 4, 5, 6];
    const [SIZE, START, MAX] = [50, 0, 49];

    let startCol;

    let face1 = Array.from(Array(SIZE), (x) => Array(SIZE));
    let face2 = Array.from(Array(SIZE), (x) => Array(SIZE));
    let face3 = Array.from(Array(SIZE), (x) => Array(SIZE));
    let face4 = Array.from(Array(SIZE), (x) => Array(SIZE));
    let face5 = Array.from(Array(SIZE), (x) => Array(SIZE));
    let face6 = Array.from(Array(SIZE), (x) => Array(SIZE));

    let faces = new Map([
        [1, face1],
        [2, face2],
        [3, face3],
        [4, face4],
        [5, face5],
        [6, face6],
    ]);

    function buildCube() {
        grid = data[0].split(EOL).map((x) => x.split(''));

        startCol =
            grid[0].indexOf(FREE) < grid[0].indexOf(WALL) && grid[0].indexOf(FREE) !== -1
                ? grid[0].indexOf(FREE)
                : grid[0].indexOf(WALL);
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
                destRow = MAX - pos.row;
                destCol = START;
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
                destRow = MAX;
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
                destRow = MAX - pos.row;
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
                destDir = SOUTH;
                destRow = START;
                destCol = pos.col;
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
            return false;
        }
        return true;
    }

    function mapRelativePosToAbsolute() {
        if (pos.face === ONE) {
            pos.col += startCol;
        } else if (pos.face === TWO) {
            pos.col += startCol + SIZE;
        } else if (pos.face === THREE) {
            pos.col += startCol;
            pos.row += SIZE;
        } else if (pos.face === FOUR) {
            pos.row += SIZE + SIZE;
        } else if (pos.face === FIVE) {
            pos.row += SIZE + SIZE;
            pos.col += startCol;
        } else {
            pos.row += SIZE + SIZE + SIZE;
        }
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

    let grid = data[0].split(EOL).map((x) => x.split(''));
    let moves = data[1]
        .replaceAll(CLOCK, ' R ')
        .replaceAll(COUNTER, ' L ')
        .split(' ')
        .map((x) => {
            if (x === CLOCK || x === COUNTER) {
                return x;
            } else {
                return parseInt(x);
            }
        });

    buildCube();

    let pos = new Position(0, faces.get(ONE)[0].indexOf(FREE), EAST, 1);
    moves.forEach((x, index) => {
        if (x === CLOCK) {
            pos.dir = (pos.dir + 1) % 4;
        } else if (x === COUNTER) {
            pos.dir = pos.dir - 1 < 0 ? 3 : pos.dir - 1;
        } else {
            for (let i = 0; i < x; i++) {
                if (pos.dir === EAST) {
                    let tarCol = pos.col + 1;
                    if (tarCol > MAX) {
                        let result = wrap();
                        if (result) {
                            break;
                        }
                    } else if (faces.get(pos.face)[pos.row][tarCol] === WALL) {
                        break;
                    } else {
                        pos.col = tarCol;
                    }
                } else if (pos.dir === SOUTH) {
                    let tarRow = pos.row + 1;
                    if (tarRow > MAX) {
                        let result = wrap();
                        if (result) {
                            break;
                        }
                    } else if (faces.get(pos.face)[tarRow][pos.col] === WALL) {
                        break;
                    } else {
                        pos.row = tarRow;
                    }
                } else if (pos.dir === WEST) {
                    let tarCol = pos.col - 1;
                    if (tarCol < START) {
                        let result = wrap();
                        if (result) {
                            break;
                        }
                    } else if (faces.get(pos.face)[pos.row][tarCol] === WALL) {
                        break;
                    } else {
                        pos.col = tarCol;
                    }
                } else if (pos.dir === NORTH) {
                    let tarRow = pos.row - 1;
                    if (tarRow < START) {
                        let result = wrap();
                        if (result) {
                            break;
                        }
                    } else if (faces.get(pos.face)[tarRow][pos.col] === WALL) {
                        break;
                    } else {
                        pos.row = tarRow;
                    }
                }
            }
        }
    });

    mapRelativePosToAbsolute();

    const answer = 1000 * (pos.row + 1) + 4 * (pos.col + 1) + pos.dir;
    return { value: answer };
}
