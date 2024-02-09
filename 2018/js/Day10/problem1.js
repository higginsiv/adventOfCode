module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const { min, max } = Math;
    lines = lines.map((line) => {
        line = line.match(/-?\d+/g).map(Number);
        return { x: line[0], y: line[1], vx: line[2], vy: line[3] };
    });

    let steps = 0;
    while (true) {
        steps++;
        lines.forEach((line) => {
            line.x += line.vx;
            line.y += line.vy;
        });

        let foundLetters = false;
        for (let i = 0; i < lines.length; i++) {
            let { x, y } = lines[i];

            if (
                lines.filter((line) => line.y === y + 1 && line.x === x).length &&
                lines.filter((line) => line.y === y + 2 && line.x === x).length &&
                lines.filter((line) => line.y === y + 3 && line.x === x).length &&
                lines.filter((line) => line.y === y + 4 && line.x === x).length &&
                lines.filter((line) => line.y === y + 5 && line.x === x).length &&
                lines.filter((line) => line.y === y + 6 && line.x === x).length &&
                lines.filter((line) => line.y === y + 7 && line.x === x).length
            ) {
                foundLetters = true;
                break;
            }
        }
        if (foundLetters) {
            break;
        }
    }

    let mins = { x: Infinity, y: Infinity };
    let maxes = { x: -Infinity, y: -Infinity };
    lines.forEach((line) => {
        mins.x = min(mins.x, line.x);
        mins.y = min(mins.y, line.y);
        maxes.x = max(maxes.x, line.x);
        maxes.y = max(maxes.y, line.y);
    });

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

    const answer = grid;
    return { value: [answer, '#'], strategy: 'grid' };
}
