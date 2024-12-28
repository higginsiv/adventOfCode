import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    let connections = new Map();

    lines.forEach((line) => {
        const [a, b] = line.split('-');
        let aConnections = connections.get(a) || new Set();
        let bConnections = connections.get(b) || new Set();
        aConnections.add(b);
        bConnections.add(a);
        connections.set(a, aConnections);
        connections.set(b, bConnections);
    });

    let groups = [];
    let keys = [...connections.keys()];
    keys.forEach((key) => {
        let newGroups = [];
        groups.forEach((group) => {
            if (group.every((k) => connections.get(key).has(k))) {
                newGroups.push([...group, key]);
            }
        });
        groups.push([key], ...newGroups);
    });

    const answer = groups
        .sort((a, b) => b.length - a.length)[0]
        .sort()
        .join(',');
    return new Solution(answer);
}
