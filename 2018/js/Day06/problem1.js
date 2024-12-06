import { manhattanDistance } from '#tools/math.js';

export default function solve({ lines, rawData }) {
    let lowX = Infinity;
    let highX = -Infinity;
    let lowY = Infinity;
    let highY = -Infinity;

    lines = lines.map((line) => {
        line = line.split(', ').map(Number);
        const x = line[0];
        const y = line[1];
        if (x < lowX) {
            lowX = x;
        }
        if (x > highX) {
            highX = x;
        }
        if (y < lowY) {
            lowY = y;
        }
        if (y > highY) {
            highY = y;
        }

        return { x, y, uniquePointsCount: 0 };
    });

    for (let i = lowX; i <= highX; i++) {
        for (let j = lowY; j <= highY; j++) {
            let minDistance = Infinity;
            let minIndex = -1;
            for (let k = 0; k < lines.length; k++) {
                const distance = manhattanDistance(lines[k], { x: i, y: j });
                if (distance < minDistance) {
                    minDistance = distance;
                    minIndex = k;
                } else if (distance === minDistance) {
                    minIndex = -1;
                }
            }
            if (minIndex !== -1) {
                if (i === lowX || i === highX || j === lowY || j === highY) {
                    lines[minIndex].uniquePointsCount = -Infinity;
                } else {
                    lines[minIndex].uniquePointsCount++;
                }
            }
        }
    }

    const answer = lines.reduce((max, line) => {
        if (line.uniquePointsCount === -Infinity) {
            return max;
        }
        return max > line.uniquePointsCount ? max : line.uniquePointsCount;
    });
    return { value: answer };
}
