// This problem uses bitmasks even though it is more complicated than necessary just for practice with them.
// TODO go back thru these for speed improvements

const fr = require('../../../tools/fileReader');
const OUTPUT = require('../../../tools/output');
const [YEAR, DAY, PART] = ['2015', '24', '1'];

let bitmasks = new Map();
const DATA = fr.getInput(YEAR, DAY).map(Number).reverse();

DATA.forEach((curr, i) => {
    bitmasks.set(curr, 1 << i);
});
const goalWeight = DATA.reduce((total, curr) => total + curr, 0) / 3;

let combinations = [];
let bestToGoalWeight = Infinity;
let bestQE = Infinity;

getCombinations(DATA.slice(), 0, [0, 0, 0], 0, goalWeight, 0, 0);

function getNumberOfPresents(bucket) {
    let total = 0;
    let presents = bucket.toString(2).match(/1/g);
    if (presents) {
        total = presents.length;
    }
    return total;
}

function getCombinations(
    arr,
    currentWeight,
    buckets,
    bucketIndex,
    goalWeight,
    visited,
    furthestInBucket,
) {
    if (bestToGoalWeight < getNumberOfPresents(buckets[0])) return;

    for (let i = furthestInBucket; i < arr.length; i++) {
        const curr = arr[i];
        if (visited & bitmasks.get(curr)) continue;

        const potentialWeight = currentWeight + curr;
        let newBuckets = buckets.slice();
        if (potentialWeight < goalWeight) {
            newBuckets[bucketIndex] |= bitmasks.get(curr);
            getCombinations(
                arr,
                potentialWeight,
                newBuckets,
                bucketIndex,
                goalWeight,
                visited | bitmasks.get(curr),
                i + 1,
            );
        } else if (potentialWeight === goalWeight) {
            newBuckets[bucketIndex] |= bitmasks.get(curr);
            if (bucketIndex === 1) {
                newBuckets[2] = ~newBuckets[0] & ~newBuckets[1];
                let bucket3Weight = 0;
                bitmasks.forEach((value, key) => {
                    if (newBuckets[2] & value) {
                        bucket3Weight += key;
                    }
                });
                if (bucket3Weight === goalWeight) {
                    combinations.push(newBuckets);
                }
            } else {
                // TODO this check can be done before the goal weight is reached
                if (bucketIndex === 0) {
                    let oldBest = bestToGoalWeight;
                    let tentQE = getQE(newBuckets[0]);
                    bestToGoalWeight = Math.min(
                        bestToGoalWeight,
                        newBuckets[0].toString(2).match(/1/g).length,
                    );
                    if (oldBest === bestToGoalWeight) {
                        bestQE = Math.min(bestQE, tentQE);
                        if (bestQE !== tentQE) {
                            continue;
                        }
                    } else {
                        bestQE = getQE(tentQE);
                    }
                }
                getCombinations(
                    arr,
                    0,
                    newBuckets,
                    bucketIndex + 1,
                    goalWeight,
                    visited | bitmasks.get(curr),
                    0,
                );
            }
        }
    }
}

function getQE(bucket) {
    let qe = 1;
    bitmasks.forEach((value, key) => {
        if (bucket & value) {
            qe *= key;
        }
    });
    return qe;
}

combinations.sort((a, b) => {
    let aLength = a[0].toString(2).match(/1/g).length;
    let bLength = b[0].toString(2).match(/1/g).length;

    if (aLength === bLength) {
        let aQE = 1;
        let bQE = 1;

        bitmasks.forEach((value, key) => {
            if (a[0] & value) {
                aQE *= key;
            }
            if (b[0] & value) {
                bQE *= key;
            }
        });
        a[3] = aQE;
        b[3] = bQE;
        return aQE - bQE;
    }
    return aLength - bLength;
});

let answer = combinations[0][3];
OUTPUT.output(YEAR, DAY, PART, answer);
