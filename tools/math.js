module.exports = {
    getLCM: function (a, b) {
        return (a * b) / getGCD(a, b);
    },
    getGCD: getGCD,
    permute: permute,
    getCombinations: getCombinations,
    getCombinationsQueue: getCombinationsQueue,
    manhattanDistance: manhattanDistance,
    manhattanDistance3d: manhattanDistance3d,
    solveQuadratic: solveQuadratic,
    shoelace: shoelace,
    picksTheorem: picksTheorem,
    countPointsWithinDistance: countPointsWithinDistance,
    countPointsAtDistance: countPointsAtDistance,
    condenseRanges: condenseRanges,
    getFactors: getFactors
};

function getGCD(a, b) {
    return b == 0 ? a : getGCD(b, a % b);
}

function permute(data, perm = [], results = []) {
    if (data.length === 0) {
        results.push(perm);
        return;
    } else {
        for (let i = 0; i < data.length; i++) {
            let curr = data.slice();
            let next = curr.splice(i, 1);
            permute(curr.slice(), perm.concat(next), results);
        }
    }
    return results;
}
function getCombinations(symbols, length) {
    if (length === 1) {
        return symbols;
    }
    let combinations = [];
    if (length === 0) {
        return combinations;
    }
    let smallerCombinations = getCombinations(symbols, length - 1);
    for (let symbol of symbols) {
        for (let smallerCombination of smallerCombinations) {
            combinations.push(symbol + smallerCombination);
        }
    }

    return combinations;
}

function getCombinationsQueue(symbols, length) {
    let allCombinations = [];
    let queue = symbols.map((symbol) => [symbol]);

    while (queue.length > 0) {
        let combination = queue.shift();

        if (combination.length === length) {
            allCombinations.push(combination.join(''));
        } else {
            for (let symbol of symbols) {
                queue.push([...combination, symbol]);
            }
        }
    }

    return allCombinations;
}

function manhattanDistance(start, end) {
    return Math.abs(start.x - end.x) + Math.abs(start.y - end.y);
}

function manhattanDistance3d(start, end) {
    return Math.abs(start.x - end.x) + Math.abs(start.y - end.y) + Math.abs(start.z - end.z);
}

function solveQuadratic(a, b, c) {
    let discriminant = Math.pow(b, 2) - 4 * a * c;
    if (discriminant < 0) {
        return null;
    }
    let x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    let x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    return [x1, x2];
}

// Calculate area of polygon defined by vertices
function shoelace(vertices) {
    let area = 0;
    for (let i = 0; i < vertices.length; i++) {
        let j = (i + 1) % vertices.length;
        area += vertices[i][0] * vertices[j][1];
        area -= vertices[j][0] * vertices[i][1];
    }
    return Math.abs(area / 2);
}

// Calculates area of polygon while counting it's vertices as part of the polygon
function picksTheorem(vertices) {
    return shoelace(vertices) + 2 - vertices.length;
}

// Uses the area of a diamond to calculate the number of points within a given manhattan distance
function countPointsWithinDistance(n) {
    return 2 * n * (n + 1) + 1;
}

// Returns number of points at manhattan distance n
function countPointsAtDistance(n) {
    return 4 * n;
}

function condenseRanges(ranges) {
    ranges.sort((a, b) => a[0] - b[0]);

    let result = [ranges[0]];

    for (let i = 1; i < ranges.length; i++) {
        let range = ranges[i];
        let lastRange = result[result.length - 1];

        if (range[0] <= lastRange[1] + 1) {
            lastRange[1] = Math.max(range[1], lastRange[1]);
        } else {
            result.push(range);
        }
    }

    return result;
}

function getFactors(n) {
    let factors = [];
    for (let i = 1; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            factors.push(i);
            if (n / i !== i) {
                factors.push(n / i);
            }
        }
    }
    return factors;
}
