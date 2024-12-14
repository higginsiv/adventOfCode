import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    const SECONDS = 100;
    const HEIGHT = 103;
    const WIDTH = 101;
    const quadrants = [0, 0, 0, 0];

    lines = lines.map((line) => {
        const [posX, posY, vX, vY] = line.match(/-?\d+/g).map(Number);
        return { posX, posY, vX, vY };
    });

    lines.forEach((point) => {
        const finalPosition = {
            posX: wrap(point.posX + SECONDS * point.vX, WIDTH),
            posY: wrap(point.posY + SECONDS * point.vY, HEIGHT)
        }
        addToQuadrant(finalPosition);
    });

    const answer = quadrants.reduce((acc, curr) => acc * curr, 1);
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
