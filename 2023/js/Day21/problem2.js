const fr = require('../../../tools/fileReader');
const MATH = require('../../../tools/math');
const OUTPUT = require('../../../tools/output');
const [YEAR, DAY, PART] = ["2023","21","2"];
const DATA = fr.getInput(YEAR,DAY).map(x => x.split(''));
const ROCK = '#';
const MAX_STEPS = 26501365;

let start;
let evenPlots = [];
let oddPlots = [];

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

for (let i = 0; i < DATA.length; i++) {
    for (let j = 0; j < DATA[i].length; j++) {
        if (DATA[i][j] === 'S' || DATA[i][j] === '.') {
            let distance = MATH.manhattanDistance({x:start[0], y:start[1]}, {x:i, y:j});
            distance % 2 === 0 ? evenPlots.push([i,j]) : oddPlots.push([i,j]);
        }
    }
}
// oddPlots.push(start.slice());
let numberOfEvenPlots = evenPlots.length;
let numberOfOddPlots = oddPlots.length;

let distanceToNextStart = DATA.length;
let furthestGridReached = Math.floor(MAX_STEPS / distanceToNextStart);
let stepsLeftover = MAX_STEPS % distanceToNextStart;
let numberOfGridsReached = MATH.countPointsWithinDistance(furthestGridReached);
let numberOfGridsOnEdge = MATH.countPointsAtDistance(furthestGridReached);

let totalOddGrids = countOddPointsWithinDistance(furthestGridReached);
let totalEvenGrids = countEvenPointsWithinDistance(furthestGridReached);

// All edges are odd since furthestGridReached is an even number and we start on odd
// let oddWholeGrids = totalOddGrids - numberOfGridsOnEdge;

console.log('Distance to next start:', distanceToNextStart);
console.log('Furthest grid reached:', furthestGridReached);
console.log('Steps leftover:', stepsLeftover);
console.log('Number of grids reached:', numberOfGridsReached);
console.log('Number of grids on edge:', numberOfGridsOnEdge)
console.log('Odd Whole grids:', totalOddGrids);
console.log('Even Whole grids:', totalEvenGrids);
console.log('furthest grid squard:', furthestGridReached * furthestGridReached);
console.log('furthest + 1 squared', (furthestGridReached + 1) * (furthestGridReached + 1));
console.log('Odd Plots in grid:', numberOfOddPlots);
console.log('Even Plots in grid:', numberOfEvenPlots);
// console.log('Double Check Total number of grids', oddWholeGrids + totalEvenGrids + numberOfGridsOnEdge);

console.log('Can reach in steps:', MATH.countPointsWithinDistance(1));
console.log('Can reach in steps:', MATH.countPointsWithinDistance(2));

console.log(DATA.length, DATA[0].length);
console.log(start)

let traversal = traverse(start.slice(), 0);
let evenPlotsReached = [...traversal.keys()].filter(key => {
    let [x,y] = key.split(',').map(x => parseInt(x));
    let distance = MATH.manhattanDistance({x:start[0], y:start[1]}, {x:x, y:y});
    return distance % 2 === 0 && distance < 65;
}).length;
let oddPlotsReached = [...traversal.keys()].filter(key => {
    let [x,y] = key.split(',').map(x => parseInt(x));
    let distance = MATH.manhattanDistance({x:start[0], y:start[1]}, {x:x, y:y});
    return distance % 2 === 1 && distance < 65;
}).length;
let oddUnreached = [...traversal.keys()].filter(key => {
    let distance = traversal.get(key);
    return distance % 2 === 1 && distance > 65;
}).length;

let evenUnreached = [...traversal.keys()].filter(key => {
    let distance = traversal.get(key);
    return distance % 2 === 0 && distance > 65;
}).length;

let evenFull = [...traversal.keys()].filter(key => {
    let distance = traversal.get(key);
    return distance % 2 === 0
}).length;

let oddFull = [...traversal.keys()].filter(key => {
    let distance = traversal.get(key);
    return distance % 2 === 1
}).length;

console.log('evenFull:', evenFull)
console.log('oddFull:', oddFull)
console.log('all reachable in even grids with max length 64', evenPlotsReached)
console.log('all reachable in odd grids with max length 65', oddPlotsReached);
console.log('all odds plots not reached with max length 65', oddUnreached);
console.log('all even plots not reached with max length 64', evenUnreached);

function traverse(start, startingStep) {
    let queue = [{point: start.slice(), stepsTaken: startingStep}];
    let pointToStepsTaken = new Map();
    pointToStepsTaken.set(generateKey(start[0], start[1]), startingStep);
    while (queue.length > 0) {
        let current = queue.pop();

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

    return pointToStepsTaken;
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

// part 1 end

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

console.log(furthestGridReached)

let answer = (totalOddGrids * oddFull) + (totalEvenGrids * evenFull) - ((furthestGridReached + 1) * oddUnreached) + ((furthestGridReached) * evenUnreached);

// 622231206983773
// 1244453196782404 too high
// 622231206983773 no idea
// 622231206174567
// 622231206376869 no idea
// 622231206376868 no idea
// 622231206384310 no idea
// 621164025328615 no idea
// 621164111103815 too low
// 621164111103789 too low
// 621944727930768
OUTPUT.output(YEAR, DAY, PART, answer);