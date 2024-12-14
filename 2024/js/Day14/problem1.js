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
        let visited = new Map();
        visited.set(`${point.posX},${point.posY}`, 0);

        for (let i = 1; i <= SECONDS; i++) {
            point.posX = wrap(point.posX + point.vX, WIDTH);
            point.posY = wrap(point.posY + point.vY, HEIGHT);

            const key = `${point.posX},${point.posY}`;
            if (visited.has(key)) {
                const diffSeconds = i - visited.get(key);
                const remainingTime = SECONDS - i;
                const extraTime = remainingTime % diffSeconds;

                const final = {
                    posX: wrap(point.posX + extraTime * point.vX, WIDTH),
                    posY: wrap(point.posY + extraTime * point.vY, HEIGHT),
                };
                addToQuadrant(final);
                break;
            } else if (i === SECONDS) {
                addToQuadrant(point);
                break;
            }
            visited.set(key, i);
        }
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
