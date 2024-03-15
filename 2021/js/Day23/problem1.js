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
        let {grid, energy} = queue.next();
    
        if (isGridSolved(grid)) {
            return energy;
        }
        
        for (let rowIndex = 1; rowIndex < 4; rowIndex++) {
            let row = grid[rowIndex];
            if (rowIndex === 0 || rowIndex === grid.length - 1) {
                continue;
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
                    // always takes at least 1 energy unit to move up
                    let newEnergy = energy + energies.get(cell);
                    // if on the bottom it takes another energy unit
                    if (rowIndex === 3) {
                        if (grid[rowIndex - 1][cellIndex] === EMPTY) {
                            newEnergy += energies.get(cell);
                        } else {
                            return;
                        }
                    }

                    // move left and right until we cannot
                    moveLaterally(grid, rowIndex, cellIndex, newEnergy, -1, queue);
                    moveLaterally(grid, rowIndex, cellIndex, newEnergy, 1, queue);
                }

                if (rowIndex === 1) {
                    moveToRoom(grid, goalRooms.get(cell), cellIndex, cell, energy, queue);
                }
            });
        };
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

function moveLaterally(grid, rowIndex, cellIndex, energy, direction, queue) {
    let newCol = cellIndex;
    let newEnergy = energy;
    const cell = grid[rowIndex][cellIndex];
    while (grid[1][newCol + direction] === EMPTY) {
        newCol += direction;
        newEnergy += energies.get(cell);

        if (shouldNotStop(newCol)) {
            continue;
        }

        let newGrid = grid.map((row) => row.slice());
        newGrid[1][newCol] = cell;
        newGrid[rowIndex][cellIndex] = EMPTY;
        insertIntoQueue(newGrid, newEnergy, queue);
    }
}