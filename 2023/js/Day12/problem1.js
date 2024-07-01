import * as MATH from '../../../tools/math.js';
export default function solve({ lines, rawData }) {
    const DATA = lines.map((x) => x.split(' '));
    const [OPERATIONAL, DAMAGED, UNKNOWN] = ['.', '#', '?'];
    const SYMBOLS = [OPERATIONAL, DAMAGED];

    let combinations = new Map();
    const answer = DATA.reduce((total, curr, index) => {
        const springs = curr[0];
        const damages = curr[1].match(/\d+/g).map((x) => parseInt(x));
        const numberOfUnknowns = springs.match(/\?/g).length;

        let damagesRegex = damages.reduce((total, curr, index) => {
            const lastRegexSymbol = index === damages.length - 1 ? '*' : '+';
            return `${total}${DAMAGED}{${curr}}[${OPERATIONAL}]${lastRegexSymbol}`;
        }, `[${OPERATIONAL}]*`);

        let regex = new RegExp(`^${damagesRegex}$`, 'g');

        const knownDamages = springs.match(/#/g);
        const damagesSum = damages.reduce((total, curr) => total + curr, 0);
        // TODO could speed up by preventing combinations from being added instead of filtering after
        let combos = getCachedCombos(SYMBOLS, numberOfUnknowns)
            .slice()
            .filter((x) => {
                let damagesInCombo = x.match(/#/g);
                let knownDamagesLength = knownDamages !== null ? knownDamages.length : 0;
                let damagesInComboLength = damagesInCombo !== null ? damagesInCombo.length : 0;

                return damagesInComboLength + knownDamagesLength === damagesSum;
            })
            .map((x) => x.split(''));

        return (
            total +
            combos.reduce((total, combo, index) => {
                let localSprings = springs.slice();
                while (combo.length > 0) {
                    let nextSymbol = combo.shift();
                    localSprings = localSprings.replace(UNKNOWN, nextSymbol);
                }
                let matches = localSprings.match(regex);
                return total + (matches !== null ? matches.length : 0);
            }, 0)
        );
    }, 0);

    function getCachedCombos(symbols, length) {
        if (combinations.has(length)) {
            return combinations.get(length);
        }

        let combos = MATH.getCombinations(symbols, length);
        combinations.set(length, combos);
        return combos;
    }
    return { value: answer };
}
