module.exports = { solve: solve };
const PriorityQueue = require('../../../tools/queue.js');
const [WALL, EMPTY, VOID] = ['#', '.', ''];

function solve({ lines, rawData }) {
    const answer = runSimulation(lines);
    return { value: answer };
}

function runSimulation(lines) {
    const goalRooms = new Map([
        ['A', 3],
        ['B', 5],
        ['C', 7],
        ['D', 9],
    ]);

    const energies = new Map([
        ['A', 1],
        ['B', 10],
        ['C', 100],
        ['D', 1000],
    ]);

    let grid = lines.map((line) => line.split(''));

    let queue = new PriorityQueue([{ grid, energy: 0 }], compare);

    let i = 0;
    while (queue.isNotEmpty()) {
        // console.log(i++)
        let current = queue.next();
        let { grid, energy } = current;
        if (isGridSolved(grid)) {
            console.log('we did it')
            return energy;
        }
        grid.forEach((row, rowIndex) => {
            if (rowIndex === 0 || rowIndex === grid.length - 1) {
                return;
            }
            row.forEach((cell, cellIndex) => {
                if (cell === WALL || cell === EMPTY || cell === VOID) {
                    return;
                }

                if (rowIndex === 2 || rowIndex === 3) {
                    // move out of room if possible and logical

                    // check if we SHOULD move out of room
                    if (rowIndex === 2) {
                        // check self and below
                        const below = grid[rowIndex + 1][cellIndex];
                        if (
                            goalRooms.get(below) === cellIndex &&
                            goalRooms.get(cell) === cellIndex
                        ) {
                            return;
                        }
                    } else if (rowIndex === 3) {
                        // check self
                        if (goalRooms.get(cell) === cellIndex) {
                            return;
                        }
                    }

                    // check if we CAN move out of room
                    let newRow;
                    let newEnergyLeft = energy + energies.get(cell);
                    let newEnergyRight = energy + energies.get(cell);
                    if (rowIndex === 2) {
                        // Nobody can stop right outside of a room so we can go ahead and move up
                        newRow = rowIndex - 1;
                    } else if (rowIndex === 3) {
                        if (grid[rowIndex - 1][cellIndex] === EMPTY) {
                            newRow = rowIndex - 1;
                            newEnergyLeft += energies.get(cell);
                            newEnergyRight += energies.get(cell);
                        } else {
                            return;
                        }
                    }

                    let colLeft = cellIndex - 1;
                    let colRight = cellIndex + 1;

                    // Go left and right until we can't anymore
                    while (grid[newRow][colLeft] === EMPTY) {
                        colLeft--;
                        newEnergyLeft += energies.get(cell);
                        let newGrid = grid.map((row) => row.slice());
                        newGrid[newRow][colLeft] = cell;
                        newGrid[rowIndex][cellIndex] = EMPTY;
                        queue.insert({ grid: newGrid, energy: newEnergyLeft });
                    }

                    while (grid[newRow][colRight] === EMPTY) {
                        colRight++;
                        newEnergyRight += energies.get(cell);
                        let newGrid = grid.map((row) => row.slice());
                        newGrid[newRow][colRight] = cell;
                        newGrid[rowIndex][cellIndex] = EMPTY;
                        queue.insert({ grid: newGrid, energy: newEnergyRight });
                    }
                }

                if (rowIndex === 1) {
                    moveToRoom(grid, goalRooms.get(cell), cellIndex, cell, energy, queue);
                }
            });
        });
    }
}

function compare(a, b) {
    return a.energy - b.energy;
}

function moveToRoom(grid, roomIndex, cellIndex, letter, energy, queue) {
    if (
        (grid[3][roomIndex] !== EMPTY && grid[3][roomIndex] !== letter) ||
        grid[2][roomIndex] !== EMPTY
    ) {
        return false;
    }

    let newCellIndex = cellIndex;
    const direction = roomIndex > cellIndex ? 1 : -1;
    while (newCellIndex !== roomIndex) {
        newCellIndex += direction;
        if (grid[2][cellIndex] !== EMPTY) {
            return false;
        }
    }
    let stepsTaken = Math.abs(roomIndex - cellIndex);
    let newRow = 2;
    stepsTaken += 1;
    if (grid[3][roomIndex] === EMPTY) {
        stepsTaken += 2;
        newRow = 3;
    }

    let newGrid = grid.map((row) => row.slice());
    newGrid[newRow][roomIndex] = cell;
    newGrid[1][cellIndex] = EMPTY;
    queue.insert({ grid: newGrid, energy: energy + (stepsTaken * energies.get(letter)) });
}

function isGridSolved(grid) {
    return grid[2][3] === 'A' && grid[2][5] === 'B' && grid[2][7] === 'C' && grid[2][9] === 'D' && grid[3][3] === 'A' && grid[3][5] === 'B' && grid[3][7] === 'C' && grid[3][9] === 'D';
}
