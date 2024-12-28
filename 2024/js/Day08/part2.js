import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    let grid = lines.map((line) => line.split(''));
    let antennaToPoints = new Map();

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] !== '.') {
                let points = antennaToPoints.get(grid[y][x]);
                if (points === undefined) {
                    points = [];
                }
                points.push({ x, y });
                antennaToPoints.set(grid[y][x], points);
            }
        }
    }

    const minX = 0;
    const minY = 0;
    const maxX = grid[0].length - 1;
    const maxY = grid.length - 1;
    const uniqueAntiNodes = new Set();

    antennaToPoints.forEach((points, antenna) => {
        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                const point1 = points[i];
                const point2 = points[j];
                const dx = point2.x - point1.x;
                const dy = point2.y - point1.y;

                addAntiNodes(point1, dx, dy);
            }
        }
    });

    const answer = uniqueAntiNodes.size;
    return new Solution(answer);

    function addAntiNodes(point, dx, dy) {
        let x = point.x;
        let y = point.y;
        while (x >= minX && x <= maxX && y >= minY && y <= maxY) {
            uniqueAntiNodes.add(`${x},${y}`);
            x += dx;
            y += dy;
        }

        x = point.x;
        y = point.y;
        while (x >= minX && x <= maxX && y >= minY && y <= maxY) {
            uniqueAntiNodes.add(`${x},${y}`);
            x -= dx;
            y -= dy;
        }
    }
}
