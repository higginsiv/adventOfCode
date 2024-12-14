import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    const HEIGHT = 103;
    const WIDTH = 101;
    let quadrants = [0, 0, 0, 0];

    lines = lines.map((line) => {
        const [posX, posY, vX, vY] = line.match(/-?\d+/g).map(Number);
        return { posX, posY, vX, vY };
    });

    let seconds = 0;
    let visited = new Map();
    let secondsToSafety = new Map();
    while (true) {
        seconds++;
        quadrants = [0, 0, 0, 0];
        let finalPoints = [];
        lines.forEach((point) => {
            const finalPosition = {
                posX: wrap(point.posX + seconds * point.vX, WIDTH),
                posY: wrap(point.posY + seconds * point.vY, HEIGHT),
            };
            addToQuadrant(finalPosition);
            finalPoints.push(finalPosition);
        });
        finalPoints.sort((a, b) => {
            if (a.posY === b.posY) {
                return a.posX - b.posX;
            }
            return a.posY - b.posY;
        });
        const key = finalPoints.map((point) => `${point.posX},${point.posY},`).join('');

        if (visited.has(key)) {
            break;
        }
        visited.set(key, seconds);
        const safetyScore = quadrants.reduce((acc, curr) => acc * curr, 1);
        secondsToSafety.set(seconds, safetyScore);
    }

    const answer = [...secondsToSafety.entries()].sort((a, b) => a[1] - b[1])[0][0];
    return new Solution(answer);

    function wrap(value, max) {
        return ((value % max) + max) % max;
    }

    function addToQuadrant(point) {
        const HALF_WIDTH = (WIDTH - 1) / 2;
        const HALF_HEIGHT = (HEIGHT - 1) / 2;
        if (point.posX < HALF_WIDTH && point.posY < HALF_HEIGHT) {
            quadrants[0]++;
        } else if (point.posX > HALF_WIDTH && point.posY < HALF_HEIGHT) {
            quadrants[1]++;
        } else if (point.posX < HALF_WIDTH && point.posY > HALF_HEIGHT) {
            quadrants[2]++;
        } else if (point.posX > HALF_WIDTH && point.posY > HALF_HEIGHT) {
            quadrants[3]++;
        }
    }
}
