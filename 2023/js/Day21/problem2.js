const fr = require('../../../tools/fileReader');
const { insertIntoSortedQueue } = require('../../../tools/iteration');
const OUTPUT = require('../../../tools/output');
const [YEAR, DAY, PART] = ['2023', '21', '2'];
const DATA = fr.getInput(YEAR, DAY).map((x) => x.split(''));
const ROCK = '#';
const MAX_STEPS = 26501365;

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

let distanceToNextStart = DATA.length;
let numberOfGridsReached = Math.floor(MAX_STEPS / distanceToNextStart);
let stepsRemaining = MAX_STEPS % distanceToNextStart;

let totalOddGrids = countOddPointsWithinDistance(numberOfGridsReached);
let totalEvenGrids = countEvenPointsWithinDistance(numberOfGridsReached);

let traversal = traverse(start.slice(), 0);

let oddUnreachedCorners = [...traversal.values()].filter((distance) => {
    return distance % 2 === 1 && distance > stepsRemaining;
}).length;

let evenUnreachedCorners = [...traversal.values()].filter((distance) => {
    return distance % 2 === 0 && distance > stepsRemaining;
}).length;

let evenFull = [...traversal.values()].filter((distance) => {
    return distance % 2 === 0;
}).length;

let oddFull = [...traversal.values()].filter((distance) => {
    return distance % 2 === 1;
}).length;

function traverse(start, startingStep) {
    let queue = [{ point: start.slice(), stepsTaken: startingStep }];
    let pointToStepsTaken = new Map();
    pointToStepsTaken.set(generateKey(start[0], start[1]), startingStep);
    while (queue.length > 0) {
        let current = queue.shift();

        let neighbors = getAdjacentCoordinates(current.point[0], current.point[1]);

        neighbors.forEach((neighbor) => {
            if (DATA[neighbor[0]][neighbor[1]] === ROCK) {
                return;
            }

            let neighborKey = generateKey(neighbor[0], neighbor[1]);

            let bestStepsToNeighbor = pointToStepsTaken.get(neighborKey);

            if (bestStepsToNeighbor == null || bestStepsToNeighbor > current.stepsTaken + 1) {
                pointToStepsTaken.set(neighborKey, current.stepsTaken + 1);
                insertIntoSortedQueue(
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

function countOddPointsWithinDistance(n) {
    let count = 1;
    for (let i = 0; i <= n; i += 2) {
        count += 4 * i;
    }
    return count;
}

function countEvenPointsWithinDistance(n) {
    let count = 0;
    for (let i = 1; i <= n; i += 2) {
        count += 4 * i;
    }
    return count;
}

// With n steps you can reach MAX_STEPS / n grid centers arrayed in a diamond (like manhattan distance)
// Of those grids, every one but those in the outer ring can be fully traversed. Grids alternate whether they are odd or even
// The outer ring can only be traversed up to the amount of steps left once the center is reached, which is equal to 65 (similar to step 1)
// The valid but unreached corners must then be subtracted from our total
// Some grids will NOT have their center reached, but will have their corners reached. These must be added back in
// TODO apparently this solution does not work for all inputs. Investigate why that is

let answer =
    totalOddGrids * oddFull +
    totalEvenGrids * evenFull -
    (numberOfGridsReached + 1) * oddUnreachedCorners +
    numberOfGridsReached * evenUnreachedCorners;

OUTPUT.output(YEAR, DAY, PART, answer);
