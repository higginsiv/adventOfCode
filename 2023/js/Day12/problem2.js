const fr = require('../../../tools/fileReader');
const [YEAR, DAY, PART] = ['2023', '12', '2'];
const MATH = require('../../../tools/math');
const DATA = fr.getInput(YEAR, DAY).map((x) => x.split(' '));
const [OPERATIONAL, DAMAGED, UNKNOWN] = ['.', '#', '?'];
const SYMBOLS = [OPERATIONAL, DAMAGED];
const UNFOLDING_FACTOR = 5;

class State {
    total;
    matches;
    damages;
    constructor(total, matches, damages) {
        this.total = total;
        this.matches = matches;
        this.damages = damages;
    }
}
let answer = DATA.reduce((total, curr, index) => {
    console.log('line: ' + (index + 1));
    // console.log('T: ' + total);
    let springs = curr[0];
    // let temp = '';
    // for (let i = 0; i < UNFOLDING_FACTOR - 1; i++) {
    //     temp += (springs + UNKNOWN);
    // }
    // temp += springs;
    // springs = temp;

    // console.log(springs);
    let damages = curr[1].match(/\d+/g).map((x) => parseInt(x));
    // temp = [];
    // for (let i = 0; i < UNFOLDING_FACTOR; i++) {
    //     temp = temp.concat(damages);
    // }
    // damages = temp;

    // const numberOfUnknowns = springs.match(/\?/g).length;

    const UNKNOWN_OR_DAMAGED = /(#|\?)+/g;
    let unknownOrDamagedMatches = springs.match(UNKNOWN_OR_DAMAGED);
    // console.log(unknownOrDamagedMatches);

    let totalSumOfLine = 0;

    let queue = [new State(0, unknownOrDamagedMatches.slice(), damages.slice())];

    while (queue.length > 0) {
        // console.log();
        let currentState = queue.shift();

        // if damages == 0 AND no more DAMAGED add to total
        // if matches == 0 AND damages == 0 add to total
        // if damages ==0 AND DAMAGED > 0, reset to 0
        if (currentState.damages.length === 0) {
            let damagedRemaining = currentState.matches.some((x) => x.includes(DAMAGED));
            if (!damagedRemaining) {
                totalSumOfLine += currentState.total;
            }
            continue;
        }
        if (currentState.matches.length === 0) {
            continue;
        }

        let currentMatch = currentState.matches.shift();
        // console.log('current match: ' + currentMatch);
        let damages = currentState.damages.slice();
        // console.log(damages)
        let numOfSpacesRequired = 0;
        let damagesUsed = [];

        for (let i = 0; i < currentMatch.length; i++) {
            if (numOfSpacesRequired + damages[i] <= currentMatch.length) {
                numOfSpacesRequired += damages[i] + 1;
                damagesUsed.push(damages[i]);
            }
        }
        
        let damagesUsedCombos = generateSubarrays(damagesUsed);
        // console.log('damgesUsedCombos: ');
        // console.log(damagesUsedCombos);

        let unknowns = currentMatch.match(/\?/g);
        let numberOfUnknowns = unknowns == null ? 0 : unknowns.length;

        damagesUsedCombos.forEach((damagesUsedCombo) => {
            let validSpringStatusCombos = 0;

            // Build out a regex that matches the current number of DAMAGED and OPERATIONAL springs
            let damagesRegex = damagesUsedCombo.reduce(
                (total, curr, index) => {
                    const lastRegexSymbol =
                        index === damagesUsedCombo.length - 1 ? '*' : '+';
                    return `${total}${DAMAGED}{${curr}}[${OPERATIONAL}]${lastRegexSymbol}`;
                },
                `[${OPERATIONAL}]*`
            );

            let regex = new RegExp(`^${damagesRegex}$`, 'g');

            // Build all possible combinations of DAMAGED and OPERATIONAL springs given number of UNKNOWN springs
            let springStatusCombos = MATH.getCombinations(SYMBOLS, numberOfUnknowns).map(
                (x) => {
                    return x.split('');
                }
            );

            // Iterate over the combinations and find the sum of ones matching damageRegex
            let localValidSpringStatusCombos = springStatusCombos.reduce((total, combo, index) => {
                let localSprings = currentMatch;
                while (combo.length > 0) {
                    let nextSymbol = combo.shift();
                    localSprings = localSprings.replace(UNKNOWN, nextSymbol);
                }

                let matches = localSprings.match(regex);
                // if(matches) console.log('matches: ' + matches.length);
                // if(!matches) console.log('matches: ' + 0)
                return (total += (matches != null ? matches.length : 0));
            }, 0);
            validSpringStatusCombos += localValidSpringStatusCombos;
            // console.log('validSpringStatusCombos ' + validSpringStatusCombos)

            let newDamages = damages.slice(damagesUsedCombo.length);
            const newTotal = (currentState.total > 0 ? currentState.total : 1) * (validSpringStatusCombos > 0 ? validSpringStatusCombos : 1);
            let newState = new State(newTotal, currentState.matches.slice(), newDamages);
            queue.push(newState);
        });



    }

    return total + totalSumOfLine;
}, 0);

function generateSubarrays(array) {
    return array.reduce(
        (result, value, index) => {
            if (index === 0) {
                result.push([value]);
            } else {
                result.push([...result[result.length - 1], value]);
            }
            return result;
        },
        []
    );
}

console.log(`Year ${YEAR} Day ${DAY} Puzzle ${PART}: ${answer}`);
