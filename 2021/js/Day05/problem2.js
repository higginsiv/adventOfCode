import tool from './tools.js';
export default function solve({ lines, rawData }) {
    const data = lines;

    let grid = [];

    for (let i = 0; i < data.length; i++) {
        const [point1p, point2p, horLine, vertLine, diagLine] = tool.getPoints(data[i]);

        if (!horLine && !vertLine && !diagLine) {
            // Only consider horizontal or vertical lines, no diagonals
            continue;
        }

        let point1;
        let point2;

        if (horLine) {
            if (point1p[0] < point2p[0]) {
                point1 = point1p;
                point2 = point2p;
            } else {
                point1 = point2p;
                point2 = point1p;
            }

            for (let i = point1[0]; i <= point2[0]; i++) {
                if (grid[i] == null) {
                    grid[i] = [];
                }
                if (grid[i][point1[1]] == null) {
                    grid[i][point1[1]] = 0;
                }
                grid[i][point1[1]]++;
            }
        } else if (vertLine) {
            if (point1p[1] < point2p[1]) {
                point1 = point1p;
                point2 = point2p;
            } else {
                point1 = point2p;
                point2 = point1p;
            }

            for (let i = point1[1]; i <= point2[1]; i++) {
                if (grid[point1[0]] == null) {
                    grid[point1[0]] = [];
                }
                if (grid[point1[0]][i] == null) {
                    grid[point1[0]][i] = 0;
                }

                grid[point1[0]][i]++;
            }
        } else if (diagLine) {
            if (point1p[0] < point2p[0]) {
                point1 = point1p;
                point2 = point2p;
            } else {
                point1 = point2p;
                point2 = point1p;
            }

            let yPos = point1[1];
            for (let i = point1[0]; i <= point2[0]; i++) {
                // is diagonal going up or down
                const increment = point1[1] < point2[1] ? 1 : -1;

                if (grid[i] == null) {
                    grid[i] = [];
                }

                if (grid[i][yPos] == null) {
                    grid[i][yPos] = 0;
                }
                grid[i][yPos]++;
                yPos += increment;
            }
        }
    }

    let num = 0;
    grid.forEach((x) => {
        x.forEach((y) => {
            if (y > 1) {
                num++;
            }
        });
    });
    return { value: num };
}
