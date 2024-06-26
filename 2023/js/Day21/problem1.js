module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const ITERATION = require('../../../tools/iteration');
    const DATA = lines.map((x) => x.split(''));
    const ROCK = '#';
    const MAX_STEPS = 64;

    let start;
    for (let i = 0; i < DATA.length; i++) {
        for (let j = 0; j < DATA[i].length; j++) {
            if (DATA[i][j] === 'S') {
                start = [i, j];
                break;
            }
        }
        if (start != null) {
            break;
        }
    }

    function traverse(start, startingStep) {
        let queue = [{ point: start.slice(), stepsTaken: startingStep }];
        let pointToStepsTaken = new Map();
        pointToStepsTaken.set(generateKey(start[0], start[1]), startingStep);

        while (queue.length > 0) {
            let current = queue.shift();

            let neighbors = getAdjacentCoordinates(current.point[0], current.point[1]);

            neighbors.forEach((neighbor) => {
                let neighborKey = generateKey(neighbor[0], neighbor[1]);

                let bestStepsToNeighbor = pointToStepsTaken.get(neighborKey);

                if (bestStepsToNeighbor == null || bestStepsToNeighbor > current.stepsTaken + 1) {
                    pointToStepsTaken.set(neighborKey, current.stepsTaken + 1);
                    ITERATION.insertIntoSortedQueue(
                        queue,
                        { point: neighbor, stepsTaken: current.stepsTaken + 1 },
                        'stepsTaken',
                    );
                }
            });
        }

        return pointToStepsTaken;
    }

    function generateKey(x, y) {
        return `${x},${y}`;
    }

    function getAdjacentCoordinates(x, y) {
        return [
            [x - 1, y],
            [x + 1, y],
            [x, y - 1],
            [x, y + 1],
        ].filter(
            ([x, y]) =>
                x >= 0 && x < DATA.length && y >= 0 && y < DATA[x].length && DATA[x][y] !== ROCK,
        );
    }

    const answer = [...traverse(start.slice(), 0).values()].filter(
        (x) => x % 2 === 0 && x <= MAX_STEPS,
    ).length;
    return { value: answer };
}
