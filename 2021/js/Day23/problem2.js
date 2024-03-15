module.exports = { solve: solve };
const PriorityQueue = require('../../../tools/queue.js');
const [WALL, EMPTY, VOID] = ['#', '.', ''];
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

const cache = new Map();

function solve({ lines, rawData }) {
    const answer = runSimulation(lines);
    return { value: answer };
}

function runSimulation(lines) {
    let grid = lines.map((line) => line.split(''));

    let queue = new PriorityQueue([{ grid, energy: 0 }], compare);

    let i = 0;
    while (queue.isNotEmpty()) {
        // TODO use cache to avoid repeating states
        // console.log(i++)
        i++;

        let current = queue.next();
        let { grid, energy } = current;
        // printGrid(grid);
        // console.log('energy', energy);
        // if (i === 20) {
        //     break;
        // }
    
        if (isGridSolved(grid)) {
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
                    // TODO newRow can always be set to 1?
                    let newRow;
                    let newEnergyLeft = energy + energies.get(cell);
                    let newEnergyRight = energy + energies.get(cell);
                    if (rowIndex === 2) {
                        // Nobody can stop right outside of a room so we can go ahead and move up
                        newRow = rowIndex - 1;
                    } else if (rowIndex === 3) {
                        if (grid[rowIndex - 1][cellIndex] === EMPTY) {
                        // console.log('valid move from bottom')
                            newRow = rowIndex - 2;
                            newEnergyLeft += energies.get(cell);
                            newEnergyRight += energies.get(cell);
                        } else {
                            return;
                        }
                    }

                    let colLeft = cellIndex - 1;
                    newEnergyLeft += energies.get(cell);
                    let colRight = cellIndex + 1;
                    newEnergyRight += energies.get(cell);

                    // Go left and right until we can't anymore
                    while (grid[newRow][colLeft - 1] === EMPTY) {
                        colLeft--;
                        newEnergyLeft += energies.get(cell);

                        if (shouldNotStop(colLeft)) {
                            continue;
                        }

                        let newGrid = grid.map((row) => row.slice());
                        newGrid[newRow][colLeft] = cell;
                        newGrid[rowIndex][cellIndex] = EMPTY;
                        // queue.insert({ grid: newGrid, energy: newEnergyLeft });
                        insertIntoQueue(newGrid, newEnergyLeft, queue);
                    }

                    while (grid[newRow][colRight + 1] === EMPTY) {
                        colRight++;
                        newEnergyRight += energies.get(cell);
                        if (shouldNotStop(colRight)) {
                            continue;
                        }

                        let newGrid = grid.map((row) => row.slice());
                        newGrid[newRow][colRight] = cell;
                        newGrid[rowIndex][cellIndex] = EMPTY;
                        // queue.insert({ grid: newGrid, energy: newEnergyRight });
                        insertIntoQueue(newGrid, newEnergyRight, queue);
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
        if (grid[1][newCellIndex] !== EMPTY) {
            return false;
        }
    }
    let stepsTaken = Math.abs(roomIndex - cellIndex);
    let newRow = 2;
    stepsTaken += 1;
    if (grid[3][roomIndex] === EMPTY) {
        stepsTaken += 1;
        newRow = 3;
    }

    let newGrid = grid.map((row) => row.slice());
    newGrid[newRow][roomIndex] = letter;
    newGrid[1][cellIndex] = EMPTY;
    let newEnergy = energy + (stepsTaken * energies.get(letter));
    insertIntoQueue(newGrid, newEnergy, queue);
}

function isGridSolved(grid) {
    return grid[2][3] === 'A' && grid[2][5] === 'B' && grid[2][7] === 'C' && grid[2][9] === 'D' && grid[3][3] === 'A' && grid[3][5] === 'B' && grid[3][7] === 'C' && grid[3][9] === 'D';
}

function printGrid(grid) {
    grid.forEach((row) => {
        console.log(row.join(''));
    });
}

function shouldNotStop(index) {
    return index === 3 || index === 5 || index === 7 || index === 9;
}

function addToCache(grid, energy) {
    const key = grid.join('');
    if (cache.has(key) && cache.get(key) <= energy){
        return false;
    }
    cache.set(key, energy);
    return true;
}

function insertIntoQueue(grid, energy, queue) {
    if (addToCache(grid, energy)) {
        queue.insert({ grid, energy });
    }
}