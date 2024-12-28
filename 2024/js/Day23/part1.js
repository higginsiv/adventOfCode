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

    let groups = new Set();
    let keys = [...connections.keys()];

    for (let i = 0; i < keys.length; i++) {
        for (let j = i + 1; j < keys.length; j++) {
            let key = keys[i];
            let key2 = keys[j];

            if (connections.get(key).has(key2) && connections.get(key2).has(key)) {
                let combined = [...new Set([...connections.get(key), ...connections.get(key2)])];
                let sharedKeys = combined.filter((computer) => {
                    return (
                        connections.get(key).has(computer) && connections.get(key2).has(computer)
                    );
                });

                sharedKeys.forEach((shared) => {
                    let threeWay = [key, key2, shared].sort();
                    let valid = threeWay.some((key) => key.startsWith('t'));
                    if (valid) {
                        groups.add(threeWay.join('-'));
                    }
                });
            }
        }
    }
    const answer = groups.size;
    return new Solution(answer);
}
