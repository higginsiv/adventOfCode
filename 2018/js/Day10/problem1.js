module.exports = { solve: solve };
const { Solution, GridStrategy } = require('../../../tools/solution');

function solve({ lines, rawData }) {
    const { min, max } = Math;
    lines = lines.map((line) => {
        line = line.match(/-?\d+/g).map(Number);
        return { x: line[0], y: line[1], vx: line[2], vy: line[3] };
    });

    let mins;
    let maxes;
    while (true) {
        lines.forEach((line) => {
            line.x += line.vx;
            line.y += line.vy;
        });

        mins = { x: Infinity, y: Infinity };
        maxes = { x: -Infinity, y: -Infinity };

        lines.forEach((line) => {
            mins.x = min(mins.x, line.x);
            mins.y = min(mins.y, line.y);
            maxes.x = max(maxes.x, line.x);
            maxes.y = max(maxes.y, line.y);
        });

        if (maxes.y - mins.y <= 10) {
            break;
        }
    }

    let grid = [];
    for (let y = mins.y; y <= maxes.y; y++) {
        let row = [];
        for (let x = mins.x; x <= maxes.x; x++) {
            row.push('.');
        }
        grid.push(row);
    }

    lines.forEach((line) => {
        grid[line.y - mins.y][line.x - mins.x] = '#';
    });

    return new Solution(grid, new GridStrategy(['#']));
}
