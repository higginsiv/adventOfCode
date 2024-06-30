import { manhattanDistance } from '../../../tools/math.js';
export default function solve({ lines, rawData }) {
    const MAX_DISTANCE = 10000;
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

        return { x, y };
    });

    let averageDistance = MAX_DISTANCE / lines.length;
    let answer = 0;

    for (let i = lowX - averageDistance; i <= highX + averageDistance; i++) {
        for (let j = lowY - averageDistance; j <= highY + averageDistance; j++) {
            let totalDistance = 0;
            for (let k = 0; k < lines.length; k++) {
                totalDistance += manhattanDistance(lines[k], { x: i, y: j });
                if (totalDistance >= MAX_DISTANCE) {
                    break;
                }
            }
            if (totalDistance < MAX_DISTANCE) {
                answer++;
            }
        }
    }

    return { value: answer };
}
