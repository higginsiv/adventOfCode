module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const floor = Math.floor;
    const minutes = 1000000000;
    const [open, trees, lumber] = [0, 1, 2];
    const [openChar, treeChar, lumberChar] = ['.', '|', '#'];

    const gridToMinute = new Map();

    function getKey(grid) {
        return grid.map((row) => row.join('')).join('');
    }

    function getAdjacent(grid, x, y) {
        const adjacent = [];
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                if (dx === 0 && dy === 0) continue;
                if (x + dx < 0 || x + dx >= grid[0].length) continue;
                if (y + dy < 0 || y + dy >= grid.length) continue;
                adjacent.push(grid[y + dy][x + dx]);
            }
        }
        return adjacent;
    }

    lines = lines.map((line) => {
        line = line.split('').map((char) => {
            if (char === openChar) return open;
            if (char === treeChar) return trees;
            if (char === lumberChar) return lumber;
        });
        return line;
    });

    let grid = lines;
    let next = Array.from({ length: lines.length }, () =>
        Array.from({ length: lines[0].length }, () => null),
    );

    let minute = 0;
    let cycleStart;
    let cycleEnd;

    while (minute < minutes) {
        if (!cycleStart) {
            const key = getKey(grid);
            if (gridToMinute.has(key)) {
                cycleStart = gridToMinute.get(key);
                cycleEnd = minute;
                const cycleLength = cycleEnd - cycleStart;
                const remainingMinutes = minutes - cycleEnd;
                const remainingCycles = floor(remainingMinutes / cycleLength);
                minute = cycleEnd + remainingCycles * cycleLength;
                continue;
            }
            gridToMinute.set(key, minute);
        }

        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[0].length; x++) {
                const acre = grid[y][x];
                const neighbors = getAdjacent(grid, x, y);
                if (acre === open) {
                    next[y][x] = neighbors.filter((a) => a === trees).length >= 3 ? trees : open;
                } else if (acre === trees) {
                    next[y][x] = neighbors.filter((a) => a === lumber).length >= 3 ? lumber : trees;
                } else if (acre === lumber) {
                    next[y][x] =
                        neighbors.filter((a) => a === lumber).length >= 1 &&
                        neighbors.filter((a) => a === trees).length >= 1
                            ? lumber
                            : open;
                }
            }
        }
        [grid, next] = [next, grid];
        minute++;
    }

    let numTrees = 0;
    let numLumber = 0;

    grid.forEach((row) => {
        row.forEach((acre) => {
            if (acre === trees) numTrees++;
            if (acre === lumber) numLumber++;
        });
    });

    const answer = numTrees * numLumber;
    return { value: answer };
}
