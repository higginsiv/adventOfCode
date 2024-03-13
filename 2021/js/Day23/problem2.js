module.exports = { solve: solve };

function solve({ lines, rawData }) {
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

    let grid = lines.map((line) => line.split(''));

    let queue = new PriorityQueue([{ grid, energy: 0 }], compare);

    while (queue.isNotEmpty()) {
        let current = queue.next();
        let { grid, energy } = current;
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

                    let colLeft = cellIndex;
                    let colRight = cellIndex;

                    // Go left and right until we can't anymore
                    while (grid[newRow][colLeft] === EMPTY) {
                        colLeft--;
                        newEnergyLeft += energies.get(cell);
                        let newGrid = grid.map((row) => row.slice());
                        newGrid[newRow][colLeft] = cell;
                        newGrid[rowIndex][cellIndex] = EMPTY;
                        queue.add({ grid: newGrid, energy: newEnergyLeft });
                    }

                    while (grid[newRow][colRight] === EMPTY) {
                        colRight++;
                        newEnergyRight += energies.get(cell);
                        let newGrid = grid.map((row) => row.slice());
                        newGrid[newRow][colRight] = cell;
                        newGrid[rowIndex][cellIndex] = EMPTY;
                        queue.add({ grid: newGrid, energy: newEnergyRight });
                    }
                }

                if (rowIndex === 1) {
                    // move into room
                }
            });
        });
    }
    const answer = null;
    return { value: answer };
}

function compare(a, b) {
    return a.energy - b.energy;
}
