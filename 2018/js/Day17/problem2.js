export default function solve({ lines, rawData }) {
    const { min, max } = Math;

    let verticalLines = lines
        .filter((line) => line[0] === 'x')
        .map((line) => {
            let [x, y1, y2] = line.match(/(\d+)/g).map(Number);
            return { x, y1, y2 };
        });
    let horizontalLines = lines
        .filter((line) => line[0] === 'y')
        .map((line) => {
            let [y, x1, x2] = line.match(/(\d+)/g).map(Number);
            return { y, x1, x2 };
        });

    let minY = Infinity;
    let maxY = -Infinity;
    let minX = Infinity;
    let maxX = -Infinity;

    verticalLines.forEach((line) => {
        minY = min(minY, line.y1);
        maxY = max(maxY, line.y2);
        minX = min(minX, line.x);
        maxX = max(maxX, line.x);
    });

    horizontalLines.forEach((line) => {
        minX = min(minX, line.x1);
        maxX = max(maxX, line.x2);
        minY = min(minY, line.y);
        maxY = max(maxY, line.y);
    });

    let grid = Array(maxY + 2)
        .fill()
        .map(() => Array(maxX - minX + 2).fill('.'));

    verticalLines.forEach((line) => {
        for (let y = line.y1; y <= line.y2; y++) {
            grid[y][line.x - minX] = '#';
        }
    });

    horizontalLines.forEach((line) => {
        for (let x = line.x1; x <= line.x2; x++) {
            grid[line.y][x - minX] = '#';
        }
    });

    let index = { x: 500 - minX, y: 0 };

    function flow(x, y) {
        if (y > maxY) {
            return;
        }

        if (grid[y][x] === '.') {
            grid[y][x] = '|';
            flow(x, y + 1);
            if (grid[y + 1][x] === '#' || grid[y + 1][x] === '~') {
                flow(x - 1, y);
                flow(x + 1, y);

                let left = x;
                let right = x;
                let foundAir = false;
                while (true) {
                    left--;

                    if (grid[y][left] === '.' || left < 0) {
                        foundAir = true;
                        break;
                    }
                    if (grid[y][left] === '#') {
                        break;
                    }
                }

                while (true) {
                    right++;

                    if (grid[y][right] === '.' || right > maxX - minX + 1) {
                        foundAir = true;
                        break;
                    }
                    if (grid[y][right] === '#') {
                        break;
                    }
                }

                if (!foundAir) {
                    for (let i = left + 1; i < right; i++) {
                        grid[y][i] = '~';
                    }
                }
            }
        } else if (grid[y][x] === '#') {
            return;
        }
    }

    flow(index.x, index.y + 1);

    const answer = grid.reduce((sum, row, index) => {
        if (index < minY) {
            return sum;
        }
        return (
            sum +
            row.reduce((rowSum, cell) => {
                return rowSum + (cell === '~' ? 1 : 0);
            }, 0)
        );
    }, 0);
    return { value: answer };
}
