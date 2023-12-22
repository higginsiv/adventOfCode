const fr = require('../../../tools/fileReader');
const OUTPUT = require('../../../tools/output');
const [YEAR, DAY, PART] = ["2023","21","1"];
const DATA = fr.getInput(YEAR,DAY).map(x => x.split(''));
const ROCK = '#';
const MAX_STEPS = 7;

let start;
for (let i = 0; i < DATA.length; i++) {
    for (let j = 0; j < DATA[i].length; j++) {
        if (DATA[i][j] === 'S') {
            start = [i,j];
            break;
        }
    }
    if (start != null) {
        break;
    }
}

let pointToStepsTaken = new Map();
let visitedGoals = new Set();
let visited = new Set();
let allPossible = new Set();

let queue = [];
queue.push({point: start, stepsTaken: 0});

// discover all possible ending points
while (queue.length > 0) {
    let current = queue.pop();

    allPossible = new Set([...allPossible, ...getPointsAtDistance(current.point, MAX_STEPS - current.stepsTaken).filter(point => {
        let [x,y] = point;
        return x >= 0 && x < DATA.length && y >= 0 && y < DATA[x].length && DATA[x][y] !== ROCK;
    }).map(x => generateKey(x[0], x[1]))]);

    if (current.stepsTaken == MAX_STEPS) {
        continue;
    }

    let neighbors = getAdjacentCoordinates(current.point[0], current.point[1]);

    neighbors.forEach(neighbor => {
        if (DATA[neighbor[0]][neighbor[1]] === ROCK) {
            return;
        }

        let neighborKey = generateKey(neighbor[0], neighbor[1]);
        if (visited.has(neighborKey)) {
            return
        } else {
            visited.add(neighborKey);
            queue.push({point: neighbor, stepsTaken: current.stepsTaken + 1});
        }
    });
}

queue = [];
queue.push({point: start, stepsTaken: 0});
while (queue.length > 0) {
    let current = queue.pop();

    let currentKey = generateKey(current.point[0], current.point[1]);

    if (allPossible.has(currentKey)) {
        visitedGoals.add(currentKey);
    }

    if (visitedGoals.size === allPossible.length) {
        break;
    }

    if (current.stepsTaken == MAX_STEPS) {
        continue;
    }

    let neighbors = getAdjacentCoordinates(current.point[0], current.point[1]);

    neighbors.forEach(neighbor => {
        if (DATA[neighbor[0]][neighbor[1]] === ROCK) {
            return;
        }

        let neighborKey = generateKey(neighbor[0], neighbor[1]);

        let bestStepsToNeighbor = pointToStepsTaken.get(neighborKey);

        if (bestStepsToNeighbor == null || bestStepsToNeighbor > current.stepsTaken + 1) {
            pointToStepsTaken.set(neighborKey, current.stepsTaken + 1);
            queue.push({point: neighbor, stepsTaken: current.stepsTaken + 1});
        }
    });
}

function generateKey(x,y) {
    return `${x},${y}`;
}

function getAdjacentCoordinates(x, y) {
    return [
        [x-1, y],
        [x+1, y],
        [x, y-1],
        [x, y+1],
    ].filter(([x,y]) => x >= 0 && x < DATA.length && y >= 0 && y < DATA[x].length && DATA[x][y] !== ROCK);

}

function getPointsAtDistance(point, distance) {
    let [x, y] = point;
    let points = [];

    for (let dx = -distance; dx <= distance; dx++) {
        for (let dy = -distance; dy <= distance; dy++) {
            if (Math.abs(dx) + Math.abs(dy) === distance) {
                points.push([x + dx, y + dy]);
            }
        }
    }

    return points;
}

let answer = visitedGoals.size

OUTPUT.output(YEAR, DAY, PART, answer);