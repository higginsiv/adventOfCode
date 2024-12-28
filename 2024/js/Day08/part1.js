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

                addAntiNode(point1.x - dx, point1.y - dy);
                addAntiNode(point2.x + dx, point2.y + dy);
            }
        }
    });

    const answer = uniqueAntiNodes.size;
    return new Solution(answer);

    function addAntiNode(x, y) {
        if (x < minX || x > maxX || y < minY || y > maxY) {
            return;
        }
        uniqueAntiNodes.add(`${x},${y}`);
    }
}
