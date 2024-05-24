module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const EOL = require('os').EOL;
    let [start, rulesRaw] = rawData.split(EOL + EOL);
    start = start.split('');
    rulesRaw = rulesRaw.split(EOL).map((x) => x.split(' -> '));

    // TODO can simplify this mapping
    let rules = new Map();
    rulesRaw.forEach((x) => {
        rules.set(x[0], x[1]);
    });

    let totalOccurrences = new Map();
    start.forEach((x) => {
        totalOccurrences.set(x, (totalOccurrences.get(x) || 0) + 1);
    });

    let current = [...start];
    for (let step = 0; step < 10; step++) {
        let newArray = [];
        for (let i = 0; i < current.length; i++) {
            newArray.push(current[i]);

            if (i + 1 < current.length) {
                const addition = rules.get(current[i] + current[i + 1]);
                newArray.push(addition);
                totalOccurrences.set(addition, (totalOccurrences.get(addition) || 0) + 1);
            }
        }
        current = [...newArray];
    }

    const highest = Math.max(...totalOccurrences.values());
    const lowest = Math.min(...totalOccurrences.values());
    const dif = highest - lowest;
    return { value: dif };
}
