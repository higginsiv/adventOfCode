import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    const inputsToOutputs = new Map();
    lines.forEach((line) => {
        const [input, output] = line.split(': ');
        inputsToOutputs.set(input, output.split(' '));
    });

    let paths = 0;
    let start = 'you';
    const GOAL = 'out';
    let queue = [{ node: start, visited: new Set([start]) }];

    while (queue.length > 0) {
        const { node, visited } = queue.shift();

        if (node === GOAL) {
            paths += 1;
            continue;
        }

        const neighbors = inputsToOutputs.get(node) || [];
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                const newVisited = new Set(visited);
                newVisited.add(neighbor);
                queue.push({ node: neighbor, visited: newVisited });
            }
        }
    }

    const answer = paths;
    return new Solution(answer);
}
