module.exports = {
    getLCM: function (a, b) {
        return (a * b) / getGCD(a, b);
    },
    getGCD: getGCD,
	permute: permute,
    getCombinations: getCombinations,
    getCombinationsQueue: getCombinationsQueue
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
    let queue = symbols.map(symbol => [symbol]);

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

// function getCombinationsQueue(symbols, minLength, maxLength) {
//     let allCombinations = [];

//     if (minLength === 0) {
//         return allCombinations;
//     }

//     if (maxLength == null) {
//         maxLength = minLength;
//     }
//     for (let length = minLength; length <= maxLength; length++) {
//         if (length === 1) {
//             allCombinations.push(...symbols);
//         } else {
//             let combinations = [];
//             let smallerCombinations = getCombinations(symbols, length - 1, length - 1);

//             for (let symbol of symbols) {
//                 for (let smallerCombination of smallerCombinations) {
//                     combinations.push(symbol + smallerCombination);
//                 }
//             }

//             allCombinations.push(...combinations);
//         }
//     }

//     return allCombinations;
// }

// function getCombinations(symbols, minLength, maxLength) {
//     let allCombinations = [];
//     let queue = symbols.map(symbol => [symbol]);

//     if (minLength === 0) {
//         return allCombinations;
//     }
//     if (maxLength == null) {
//         maxLength = minLength;
//     }
//     while (queue.length > 0) {
//         let combination = queue.shift();
//         let length = combination.length;

//         if (length >= minLength) {
//             allCombinations.push(combination.join(''));
//         }

//         if (length < maxLength) {
//             for (let symbol of symbols) {
//                 queue.push([...combination, symbol]);
//             }
//         }
//     }

//     return allCombinations;
// }
