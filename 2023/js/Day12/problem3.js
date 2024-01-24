const fr = require('../../../tools/fileReader');
const [YEAR, DAY, PART] = ['2023', '12', '2'];
const MATH = require('../../../tools/math');
const DATA = fr.getInput(YEAR, DAY).map((x) => x.split(' '));
const [OPERATIONAL, DAMAGED, UNKNOWN] = ['.', '#', '?'];
const SYMBOLS = [OPERATIONAL, DAMAGED];

let combinations = new Map();
let answer = DATA.reduce((total, curr, index) => {
    const springs = curr[0].split('');
    const damages = curr[1].match(/\d+/g).map((x) => parseInt(x));

    return total + recurse(springs, damages);
}, 0);

function recurse(springs, damages, depth = 0) {
    if (depth == 1) {
        console.log('springs: ' + springs);
        console.log('damages: ' + damages);
    }

    if (damages.length === 0) {
        console.log();
        if (springs.indexOf(DAMAGED) === -1) {
            // console.log('success')
            // console.log();
            return 1;
        } else {
            return 0;
        }
    }
    if (springs.length === 0 && damages.length > 0) {
        console.log();
        return 0;
    }
    let damage = damages.shift();
    // let regex = new RegExp(`([?.]|^)([#?]{${damage}})([?.]|$)`,'g');
    let regex = new RegExp(`(?<=[?.]|^)([#?]{${damage}})(?=[?.]|$)`);
    // console.log(regex);
    let match;
    let successes = 0;

    let matches = [];
    let testString = springs;
    let pos = 0;
    while (pos < testString.length) {
        match = regex.exec(testString.slice(pos));
        if (match != null) {
            matches.push({ ...match, index: match.index + pos });
            let lastDamaged = match[0].lastIndexOf(DAMAGED);
            if (lastDamaged == -1) {
                pos += match.index + 1;
            } else {
                pos += match.index + lastDamaged + 1;
            }
        } else {
            break;
        }
    }

    for (let match of matches) {
        successes += recurse(
            springs.substring(match.index + match[0].length + 1),
            damages.slice(),
            depth + 1,
        );
    }

    // // let matches = [...springs.matchAll(regex)];
    // for (let match of matches) {
    //     console.log('depth: ' + depth);
    //     console.log('match: ' + match[0])
    //     console.log('start: ' + match.index);
    //     console.log('end: ' + regex.lastIndex);
    //     console.log();
    //     successes += recurse(springs.substring((match.index + match[0].length + 1)), damages.slice(), depth + 1);
    // }

    // while ((match = regex.exec(springs)) !== null) {
    //     console.log('depth: ' + depth);
    //     console.log('match: ' + match[0])
    //     console.log('start: ' + match.index);
    //     console.log('end: ' + regex.lastIndex);
    //     console.log();
    //     successes += recurse(springs.substring(regex.lastIndex + 1), damages.slice(), depth + 1);
    // }

    return successes;
}

function getCachedCombos(symbols, length) {
    if (combinations.has(length)) {
        return combinations.get(length);
    }

    let combos = MATH.getCombinations(symbols, length);
    combinations.set(length, combos);
    return combos;
}
function getCombinations(symbols, length, maxDamaged) {
    if (length === 1) {
        return symbols;
    }

    let combinations = [];
    let smallerCombinations = getCombinations(symbols, length - 1, maxDamaged);

    for (let symbol of symbols) {
        for (let smallerCombination of smallerCombinations) {
            // let damaged = smallerCombination.match(/#/g);
            // let damagedCount = damaged === null ? 0 : damaged.length;
            // if (symbol === DAMAGED && damagedCount >= maxDamaged) {
            //     continue;
            // }
            combinations.push(symbol + smallerCombination);
        }
    }

    return combinations;
}

console.log(`Year ${YEAR} Day ${DAY} Puzzle ${PART}: ${answer}`);
