import PriorityQueue from '#tools/queue.js';
const { abs } = Math;

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

const DEEPEST_ROW = 5;
const HALLWAY_ROW = 1;

const cache = new Map();

export default function solve({ lines, rawData }) {
    const answer = runSimulation(lines);
    return { value: answer };
}

function runSimulation(lines) {
    let newLines = '  #D#C#B#A#,  #D#B#A#C#'.split(',').map((line) => line.split(''));
    let grid = lines.map((line) => line.split(''));
    grid.splice(3, 0, ...newLines);

    let queue = new PriorityQueue([{ grid, energy: 0 }], compare);

    while (queue.isNotEmpty()) {
        let { grid, energy } = queue.next();

        if (isGridSolved(grid)) {
            return energy;
        }

        for (let rowIndex = 1; rowIndex <= DEEPEST_ROW; rowIndex++) {
            let row = grid[rowIndex];
            if (rowIndex === 0 || rowIndex === grid.length - 1) {
                continue;
            }
            row.forEach((cell, cellIndex) => {
                if (cell === WALL || cell === EMPTY || cell === VOID) {
                    return;
                }

                if (rowIndex >= 2 && rowIndex <= DEEPEST_ROW) {
                    if (!shouldMoveOutOfRoom(grid, rowIndex, cellIndex)) {
                        return;
                    }

                    let newEnergy = energy;
                    const energyToGetToHallway = getEnergyToMoveToHallway(
                        grid,
                        rowIndex,
                        cellIndex,
                    );
                    if (energyToGetToHallway === -1) {
                        return;
                    } else {
                        newEnergy += energyToGetToHallway;
                    }

                    // move left and right until we cannot
                    moveLaterally(grid, rowIndex, cellIndex, newEnergy, -1, queue);
                    moveLaterally(grid, rowIndex, cellIndex, newEnergy, 1, queue);
                }

                if (rowIndex === 1) {
                    moveToRoom(grid, goalRooms.get(cell), cellIndex, cell, energy, queue);
                }
            });
        }
    }
}

function compare(a, b) {
    return a.energy - b.energy;
}

function moveToRoom(grid, roomIndex, cellIndex, letter, energy, queue) {
    for (let i = DEEPEST_ROW; i > 1; i--) {
        if (grid[i][roomIndex] !== EMPTY && grid[i][roomIndex] !== letter) {
            return false;
        }
    }

    let newCellIndex = cellIndex;
    const direction = roomIndex > cellIndex ? 1 : -1;
    while (newCellIndex !== roomIndex) {
        newCellIndex += direction;
        if (grid[HALLWAY_ROW][newCellIndex] !== EMPTY) {
            return false;
        }
    }
    let stepsTaken = abs(roomIndex - cellIndex);
    let newRow = 1;
    while (grid[newRow + 1][roomIndex] === EMPTY) {
        newRow += 1;
        stepsTaken += 1;
    }

    let newGrid = grid.map((row) => row.slice());
    newGrid[newRow][roomIndex] = letter;
    newGrid[HALLWAY_ROW][cellIndex] = EMPTY;
    let newEnergy = energy + stepsTaken * energies.get(letter);
    insertIntoQueue(newGrid, newEnergy, queue);
}

function isGridSolved(grid) {
    for (let i = 2; i <= DEEPEST_ROW; i++) {
        if (grid[i][3] !== 'A' || grid[i][5] !== 'B' || grid[i][7] !== 'C' || grid[i][9] !== 'D') {
            return false;
        }
    }
    return true;
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
    if (cache.has(key) && cache.get(key) <= energy) {
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
    while (grid[HALLWAY_ROW][newCol + direction] === EMPTY) {
        newCol += direction;
        newEnergy += energies.get(cell);

        if (shouldNotStop(newCol)) {
            continue;
        }

        let newGrid = grid.map((row) => row.slice());
        newGrid[HALLWAY_ROW][newCol] = cell;
        newGrid[rowIndex][cellIndex] = EMPTY;
        insertIntoQueue(newGrid, newEnergy, queue);
    }
}

function shouldMoveOutOfRoom(grid, rowIndex, cellIndex) {
    let inWrongRoomOrBlocking = false;
    for (let i = rowIndex; i < grid.length; i++) {
        let cell = grid[i][cellIndex];
        if (goalRooms.get(cell) !== cellIndex) {
            inWrongRoomOrBlocking = true;
            break;
        }
    }
    return inWrongRoomOrBlocking;
}

function getEnergyToMoveToHallway(grid, rowIndex, cellIndex) {
    let energyDiff = energies.get(grid[rowIndex][cellIndex]);
    let energy = energyDiff;
    for (let i = rowIndex - 1; i > 1; i--) {
        let cell = grid[i][cellIndex];
        if (cell === EMPTY) {
            energy += energyDiff;
        } else {
            return -1;
        }
    }

    return energy;
}
