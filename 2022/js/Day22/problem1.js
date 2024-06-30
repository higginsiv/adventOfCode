export default function solve({ lines, rawData }) {
    import { EOL } from 'os';
    const data = rawData.split(EOL + EOL);

    const [FREE, WALL, VOID] = ['.', '#', ' '];
    const [EAST, SOUTH, WEST, NORTH] = [0, 1, 2, 3];
    const [CLOCK, COUNTER] = ['R', 'L'];

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

    class Position {
        row;
        col;
        dir;
        constructor(row, col, dir) {
            this.row = row;
            this.col = col;
            this.dir = dir;
        }
    }
    let pos = new Position(0, grid[0].indexOf(FREE), EAST);
    moves.forEach((x) => {
        if (x === CLOCK) {
            pos.dir = (pos.dir + 1) % 4;
        } else if (x === COUNTER) {
            pos.dir = pos.dir - 1 < 0 ? 3 : pos.dir - 1;
        } else if (pos.dir === EAST) {
            for (let i = 0; i < x; i++) {
                let tarCol = pos.col + 1 >= grid[pos.row].length ? 0 : pos.col + 1;
                let next = grid[pos.row][tarCol];
                if (next === VOID || next == null) {
                    pos.col =
                        grid[pos.row].indexOf(FREE) < grid[pos.row].indexOf(WALL)
                            ? grid[pos.row].indexOf(FREE)
                            : pos.col;
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
                    pos.col =
                        grid[pos.row].lastIndexOf(FREE) > grid[pos.row].lastIndexOf(WALL)
                            ? grid[pos.row].lastIndexOf(FREE)
                            : pos.col;
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

    const answer = 1000 * (pos.row + 1) + 4 * (pos.col + 1) + pos.dir;
    return { value: answer };
}
