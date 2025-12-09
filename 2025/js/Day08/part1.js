import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    const CONNECTIONS = 1000;
    const PAIRS = (lines.length * (lines.length - 1)) / 2;
    lines = lines
        .map((line) => line.split(',').map(Number))
        .map((coords) => ({ x: coords[0], y: coords[1], z: coords[2] }));

    const distances = new Float64Array(PAIRS);
    const circuits = [];

    let distanceIndex = 0;
    for (let i = 0; i < lines.length; i++) {
        for (let j = i + 1; j < lines.length; j++) {
            const distance = calculateDistance(lines[i], lines[j]);
            distances[distanceIndex++] = (distance * 1000 + i) * 1000 + j;
        }
    }

    distances.sort();

    let connectionCount = 0;
    while (connectionCount < CONNECTIONS) {
        const combined = distances[connectionCount];
        const locB = combined % 1000;
        const locA = Math.floor(combined / 1000) % 1000;

        const circuitA = circuits.find((c) => c.has(locA));
        const circuitB = circuits.find((c) => c.has(locB));

        if (circuitA && circuitB && circuitA !== circuitB) {
            for (const loc of circuitB) {
                circuitA.add(loc);
            }
            circuits.splice(circuits.indexOf(circuitB), 1);
        } else if (circuitA) {
            circuitA.add(locB);
        } else if (circuitB) {
            circuitB.add(locA);
        } else {
            const newCircuit = new Set([locA, locB]);
            circuits.push(newCircuit);
        }

        connectionCount++;
    }

    circuits.sort((a, b) => b.size - a.size);

    const answer = circuits[0].size * circuits[1].size * circuits[2].size;
    return new Solution(answer);

    function calculateDistance(pointA, pointB) {
        const dx = pointA.x - pointB.x;
        const dy = pointA.y - pointB.y;
        const dz = pointA.z - pointB.z;

        return dx * dx + dy * dy + dz * dz;
    }
}
