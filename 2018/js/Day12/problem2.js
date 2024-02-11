module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const iterations = 50000000000;
    const rules = new Map();

    lines.slice(2).forEach((rule) => {
        const [pattern, result] = rule.split(' => ');
        rules.set(pattern, result);
    });

    let sums = [];
    let convergence;
    let zeroIndex = 0;
    let state = lines[0].split(' ')[2].split('');
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

        state = newState;
        const sum = state.reduce((acc, pot, index) => {
            return acc + (pot === '#' ? index - zeroIndex : 0);
        }, 0);

        sums.push(sum);
        if (
            sums[sums.length - 1] - sums[sums.length - 2] ===
            sums[sums.length - 2] - sums[sums.length - 3]
        ) {
            convergence = i;
            break;
        }
    }

    const answer =
        sums[sums.length - 1] +
        (sums[sums.length - 1] - sums[sums.length - 2]) * (iterations - convergence - 1);
    return { value: answer };
}
