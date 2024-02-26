module.exports = {solve: solve};
const EXPLODED = 0;
class Pair {
    left;
    right;
    parent;
    constructor(left, right, parent) {
        this.left = left;
        this.right = right;
        this.parent = parent;
    }
}

function solve({lines, rawData}) {
    lines = lines.map(line => JSON.parse(line));
    console.log(lines[0])
    const answer = null;
    return {value: answer};
}

function add(a, b) {
    let pair = formPair(a, b);
}

function formPair(a, b) {
    return [a, b]
}

function reduce(snailNumber) {
    while (true) {
        searchAndExplode(snailNumber, 0);
        split(snailNumber);
        // TODO replace this with actual exit condition
        if (true) {
            break;
        }
    }

}

function searchAndExplode(snailNumber, depth = 0) {
    if (depth === 4) {
        return snailNumber;
    }
    let left = snailNumber[0];
    let right = snailNumber[1];
    const leftIsNumber = !isNaN(left);
    const rightIsNumber = !isNaN(right);
    // TODO work out these conditions
    let exploded;
    if (leftIsNumber && rightIsNumber) {
        // Not too deep and no reason to explode
        return;
    } else if (leftIsNumber) {
        // Right is not a number
        exploded = searchAndExplode(right, depth + 1);
    } else if (rightIsNumber) {
        // Left is not a number
        exploded = searchAndExplode(left, depth + 1);
    } else {
        // Both are not numbers
        exploded = searchAndExplode(left, depth + 1);
        // Only explode right if left didn't explode
        if (!exploded) {
            exploded = searchAndExplode(right, depth + 1);
        }
    }
    if (exploded === EXPLODED) {
        return EXPLODED;
    } else if (exploded != null) {
        // TODO explode
        // TODO set exploded number to 0
        let temp = snailNumber;
    }
}

function split() {

}