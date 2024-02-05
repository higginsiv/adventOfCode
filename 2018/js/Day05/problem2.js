module.exports = { solve: solve };

function solve({ lines, rawData }) {
    function polymerize(polymer) {
        const difference = 'A'.charCodeAt(0) - 'a'.charCodeAt(0);
        let destroyed = true;
        let destroyedIndex = 0;

        while (destroyed) {
            let nonProcessed = polymer.substring(0, destroyedIndex);
            let next = nonProcessed === '' ? [] : nonProcessed.split('');

            destroyed = false;
            let i = destroyedIndex;
            while (i < polymer.length) {
                if (i === polymer.length - 1) {
                    next.push(polymer[i]);
                    break;
                }
                let currentCharCode = polymer.charCodeAt(i);
                let nextCharCode = polymer.charCodeAt(i + 1);
                if (
                    currentCharCode - nextCharCode === difference ||
                    nextCharCode - currentCharCode === difference
                ) {
                    if (!destroyed) {
                        destroyedIndex = i === 0 ? 0 : i - 1;
                    }
                    destroyed = true;
                    i += 2;
                } else {
                    next.push(polymer[i]);
                    i++;
                }
            }
            polymer = next.join('');
        }
        return polymer;
    }

    const basePolymer = polymerize(rawData);
    const answer = 'abcdefghijklmnopqrstuvwxyz'.split('').reduce((acc, char) => {
        const regex = new RegExp(char, 'gi');
        let newPolymer = basePolymer.replace(regex, '');
        newPolymer = polymerize(newPolymer);
        return acc < newPolymer.length ? acc : newPolymer.length;
    }, basePolymer.length);

    return { value: answer };
}
