module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const iterations = 20;
    const rules = new Map();

    lines.slice(2).forEach((rule) => {
        const [pattern, result] = rule.split(' => ');
        rules.set(pattern, result);
    });

    let zeroIndex = 0;
    let state = lines[0].split(' ')[2];
    for (let i = 0; i < iterations; i++) {
        const newState = [];
        for (let j = -2; j < state.length + 2; j++) {
            const pattern =
                (state[j - 2] || '.') +
                (state[j - 1] || '.') +
                (state[j] || '.') +
                (state[j + 1] || '.') +
                (state[j + 2] || '.');

            let result = rules.get(pattern) || '.';
            let pushedFurthestRight = false;
            if (j === -2 && result === '#') {
                newState.push(result);
                zeroIndex += 1;
            } else if (j === -1) {
                if (result === '#' || newState[0] === '#') {
                    newState.push(result);
                    zeroIndex += 1;
                }
            } else if (j === state.length) {
                if (result === '#') {
                    newState.push(result);
                    pushedFurthestRight = true;
                }
            } else if (j === state.length + 1) {
                if (result === '#') {
                    if (!pushedFurthestRight) {
                        newState.push('.');
                    }
                    newState.push(result);
                }
            } else if (j >= 0 && j < state.length) {
                newState.push(result);
            }
        }

        state = newState.join('');
    }

    const answer = state.split('').reduce((acc, pot, index) => {
        return acc + (pot === '#' ? index - zeroIndex : 0);
    }, 0);
    return { value: answer };
}
