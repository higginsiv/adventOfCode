import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    const inputsToOutputs = new Map();
    lines.forEach((line) => {
        const [input, output] = line.split(': ');
        inputsToOutputs.set(input, output.split(' '));
    });

    const start = 'svr';
    const GOAL = 'out';

    const cache = new Map();
    const answer = traverse(start);

    return new Solution(answer);

    function traverse(node, vistedDac = false, visitedFft = false) {
        const cacheKey = `${node}-${vistedDac}-${visitedFft}`;
        if (cache.has(cacheKey)) {
            return cache.get(cacheKey);
        }

        if (node === GOAL) {
            if (vistedDac && visitedFft) {
                return 1;
            }
            return 0;
        }

        let totalPaths = 0;
        const neighbors = inputsToOutputs.get(node) || [];
        for (const neighbor of neighbors) {
            let newVistedDac = vistedDac;
            let newVisitedFft = visitedFft;

            if (neighbor === 'dac') {
                newVistedDac = true;
            } else if (neighbor === 'fft') {
                newVisitedFft = true;
            }

            totalPaths += traverse(neighbor, newVistedDac, newVisitedFft);
        }

        cache.set(cacheKey, totalPaths);
        return totalPaths;
    }
}
