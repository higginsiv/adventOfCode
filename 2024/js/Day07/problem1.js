import { Solution } from '#tools/solution.js';
import { getCombos } from '#tools/math.js';

export default function solve({ lines, rawData }) {
    const [ADD, MULT] = [0, 1];
    const comboCache = new Map();

    const answer = lines
        .map((line) => {
            line = line.match(/\d+/g).map(Number);
            return line;
        })
        .reduce((acc, line) => {
            const expected = line.shift();
            const operatorCount = line.length - 1;
            const combos = getCombosFromCache(operatorCount);
            for (const combo of combos) {
                let total = line[0];
                for (let i = 0; i < operatorCount; i++) {
                    switch (combo[i]) {
                        case ADD:
                            total += line[i + 1];
                            break;
                        case MULT:
                            total *= line[i + 1];
                            break;
                    }
                    
                    if (total > expected) {
                        break;
                    }
                }
                if (total === expected) {
                    return acc + total;
                }
            }
            return acc;
        }, 0);

    return new Solution(answer);

    function getCombosFromCache(operatorCount) {
        if (comboCache.has(operatorCount)) {
            return comboCache.get(operatorCount);
        }
        const combos = getCombos(operatorCount, 2);
        comboCache.set(operatorCount, combos);
        return combos;
    }
}
