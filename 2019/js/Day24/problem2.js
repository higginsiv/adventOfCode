module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const [BUG, EMPTY] = [1, 0];
    const MINUTES = 200;
    let grids = new Map();
    let grid = lines.map((line) => line.split('').map((char) => (char === '#' ? 1 : 0)));
    grids.set(0, grid);

    let deltas = [
        [0, -1],
        [1, 0],
        [0, 1],
        [-1, 0],
    ];
    let answer;
    let lowestLevel = 0;
    let highestLevel = 0;
    for (let i = 0; i < MINUTES; i++) {
        let newGrids = new Map();
        for (let [level, grid] of grids) {
            newGrids.set(
                level,
                grid.map((row) => row.slice()),
            );
        }

        lowestLevel--;
        highestLevel++;
        for (let level = lowestLevel; level <= highestLevel; level++) {
            if (!newGrids.has(level)) {
                newGrids.set(
                    level,
                    Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => 0)),
                );
            }

            let newGrid = newGrids.get(level).map((row) => row.slice());
            for (let y = 0; y < grid.length; y++) {
                for (let x = 0; x < grid[y].length; x++) {
                    if (x === 2 && y === 2) {
                        continue;
                    }
                    let bugNeighbors = 0;
                    let neighbors = getNeighbors(level, x, y);
                    neighbors.forEach(([neighborLevel, x, y]) => {
                        if (neighborLevel < lowestLevel || neighborLevel > highestLevel) {
                            return;
                        } else {
                            const grid = grids.get(neighborLevel);
                            const value = grid != null ? grid[y][x] : 0;
                            bugNeighbors += value;
                        }
                    });

                    const grid = grids.get(level);
                    const cell = grid != null ? grid[y][x] : EMPTY;
                    if (cell === BUG && bugNeighbors !== 1) {
                        newGrid[y][x] = EMPTY;
                    } else if (cell === EMPTY && (bugNeighbors === 1 || bugNeighbors === 2)) {
                        newGrid[y][x] = BUG;
                    }
                }
            }

            newGrids.set(level, newGrid);
        }
        grids = newGrids;
    }

    function getNeighbors(level, x, y) {
        let neighbors = [];
        for (let [dx, dy] of deltas) {
            const newX = x + dx;
            const newY = y + dy;
            if (newX === 2 && newY === 2) {
                if (dx === 0 && dy === -1) {
                    for (let i = 0; i < 5; i++) {
                        neighbors.push([level + 1, i, 4]);
                    }
                } else if (dx === 1 && dy === 0) {
                    for (let i = 0; i < 5; i++) {
                        neighbors.push([level + 1, 0, i]);
                    }
                } else if (dx === 0 && dy === 1) {
                    for (let i = 0; i < 5; i++) {
                        neighbors.push([level + 1, i, 0]);
                    }
                } else if (dx === -1 && dy === 0) {
                    for (let i = 0; i < 5; i++) {
                        neighbors.push([level + 1, 4, i]);
                    }
                }
            } else if (newX >= 0 && newX < 5 && newY >= 0 && newY < 5) {
                neighbors.push([level, newX, newY]);
            } else {
                if (newX < 0) {
                    neighbors.push([level - 1, 1, 2]);
                } else if (newX >= 5) {
                    neighbors.push([level - 1, 3, 2]);
                } else if (newY < 0) {
                    neighbors.push([level - 1, 2, 1]);
                } else if (newY >= 5) {
                    neighbors.push([level - 1, 2, 3]);
                }
            }
        }
        return neighbors;
    }

    answer = [...grids.values()].reduce((acc, grid) => {
        return acc + grid.flat().filter((val) => val === BUG).length;
    }, 0);
    return { value: answer };
}
