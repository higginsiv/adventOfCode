// In order to maximize reuse of existing part 10 code you are going to see a LOT of messy code

console.time();
const fr = require('../../../tools/fileReader');
const math = require('../../../tools/math.js');
const [year, day, part] = ['2019', '10', '2'];
const [ASTEROID, EMPTY] = ['#', '.'];
const DELIM = '|';
const STROIDS_TO_STROY = 200;
const [INVALID, VALID] = [0, 1];

let slopes = new Set();
let posSlopes = new Set();
let data = fr.getInput(year, day).map((x) => x.split(''));

// Find all slopes on the grid
for (let y = 0; y < data.length; y++) {
    for (let x = data[0].length - 1; x >= 0; x--) {
        if (x === 0 && y === 0) {
            continue;
        } else if (x === 0) {
            slopes.add(0 + DELIM + 1);
            posSlopes.add(0 + DELIM + 1);
        } else if (y === 0) {
            slopes.add(1 + DELIM + 0);
            posSlopes.add(1 + DELIM + 0);
        } else {
            let gcd = math.getGCD(x, y);
            let reducedX = x / gcd;
            let reducedY = y / gcd;
            slopes.add(reducedX + DELIM + reducedY);
            slopes.add(-reducedX + DELIM + reducedY);
            posSlopes.add(reducedX + DELIM + reducedY);
        }
    }
}

let stroidToStroids = new Map();
for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[0].length; x++) {
        if (data[y][x] === ASTEROID) {
            let asteroidsInView = 0;
            slopes.forEach((slope) => {
                let [slopeX, slopeY] = slope.split(DELIM).map((p) => parseInt(p));
                asteroidsInView += findFirstOnSlope(x + slopeX, y + slopeY, slopeX, slopeY);
                asteroidsInView += findFirstOnSlope(x - slopeX, y - slopeY, -slopeX, -slopeY);
                stroidToStroids.set(x + DELIM + y, asteroidsInView);
            });
        }
    }
}

let highestVal = 0;
let bestKey = 8 + DELIM + 3;
stroidToStroids.forEach((value, key) => {
    if (value > highestVal) {
        highestVal = value;
        bestKey = key;
    }
});

posSlopes = [...posSlopes];

posSlopes.sort((a, b) => {
    let [ax, ay] = a.split(DELIM).map((x) => parseInt(x));
    let [bx, by] = b.split(DELIM).map((x) => parseInt(x));

    let aSlope = ax === 0 ? Infinity : ay / ax;
    let bSlope = bx === 0 ? Infinity : by / bx;

    if (aSlope === bSlope) {
        return 0;
    }
    return bSlope - aSlope;
});

let [stationX, stationY] = bestKey.split(DELIM).map((x) => parseInt(x));

let stroidsStroyed = 0;
let lastX;
let lastY;

while (stroidsStroyed < STROIDS_TO_STROY) {
    // Straight up to horizontal
    for (let i = 0; i < posSlopes.length; i++) {
        let slope = posSlopes[i];
        let [slopeX, slopeY] = slope.split(DELIM).map((p) => parseInt(p));
        let [code, x, y] = findFirstOnSlope2(stationX + slopeX, stationY - slopeY, slopeX, -slopeY);
        if (code === VALID) {
            stroidsStroyed++;
            lastX = x;
            lastY = y;
            data[y][x] = EMPTY;
        }
        if (stroidsStroyed === STROIDS_TO_STROY) {
            break;
        }
    }
    if (stroidsStroyed === STROIDS_TO_STROY) {
        break;
    }

    // Horizontal to straight down

    // Subtract 2 to skip over the horizontal slope so we don't hit it twice in a row
    for (let i = posSlopes.length - 2; i >= 0; i--) {
        let slope = posSlopes[i];
        let [slopeX, slopeY] = slope.split(DELIM).map((p) => parseInt(p));
        let [code, x, y] = findFirstOnSlope2(stationX + slopeX, stationY + slopeY, slopeX, slopeY);
        if (code === VALID) {
            stroidsStroyed++;
            lastX = x;
            lastY = y;
            data[y][x] = EMPTY;
        }
        if (stroidsStroyed === STROIDS_TO_STROY) {
            break;
        }
    }
    if (stroidsStroyed === STROIDS_TO_STROY) {
        break;
    }

    // Straight down to Straight Left

    // Start at 1 to skip over the vertical slope so we don't hit it twice in a row
    for (let i = 1; i < posSlopes.length; i++) {
        let slope = posSlopes[i];
        let [slopeX, slopeY] = slope.split(DELIM).map((p) => parseInt(p));
        let [code, x, y] = findFirstOnSlope2(stationX - slopeX, stationY + slopeY, -slopeX, slopeY);
        if (code === VALID) {
            stroidsStroyed++;
            lastX = x;
            lastY = y;
            data[y][x] = EMPTY;
        }
        if (stroidsStroyed === STROIDS_TO_STROY) {
            break;
        }
    }
    if (stroidsStroyed === STROIDS_TO_STROY) {
        break;
    }

    // Straight Left to Straight up

    // Subtract 2 to skip over the horizontal slope so we don't hit it twice in a row. Stop at 1 so we don't hit the vertical slope twice
    for (let i = posSlopes.length - 2; i >= 1; i--) {
        let slope = posSlopes[i];
        let [slopeX, slopeY] = slope.split(DELIM).map((p) => parseInt(p));
        let [code, x, y] = findFirstOnSlope2(
            stationX - slopeX,
            stationY - slopeY,
            -slopeX,
            -slopeY,
        );
        if (code === VALID) {
            stroidsStroyed++;
            lastX = x;
            lastY = y;
            data[y][x] = EMPTY;
        }
        if (stroidsStroyed === STROIDS_TO_STROY) {
            break;
        }
    }
    if (stroidsStroyed === STROIDS_TO_STROY) {
        break;
    }
}

function findFirstOnSlope(x, y, slopeX, slopeY) {
    if (y >= data.length || x >= data[0].length || y < 0 || x < 0) {
        return 0;
    } else if (data[y][x] === ASTEROID) {
        return 1;
    } else {
        return findFirstOnSlope(x + slopeX, y + slopeY, slopeX, slopeY);
    }
}

// I didn't feel like refactoring the first findFirstOnSlope to account for this use case
// because it was very later. Now that the problem is done I feel even less like refactoring
function findFirstOnSlope2(x, y, slopeX, slopeY) {
    if (y >= data.length || x >= data[0].length || y < 0 || x < 0) {
        return [INVALID];
    } else if (data[y][x] === ASTEROID) {
        return [VALID, x, y];
    } else {
        return findFirstOnSlope2(x + slopeX, y + slopeY, slopeX, slopeY);
    }
}

let answer = lastX * 100 + lastY;
console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();
