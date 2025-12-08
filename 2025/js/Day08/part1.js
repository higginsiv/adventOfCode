import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    const CONNECTIONS = 1000;
    lines = lines
        .map((line) => line.split(',').map(Number))
        .map((coords) => ({ x: coords[0], y: coords[1], z: coords[2] }));

    const distancesToLoc = new Map();
    const distances = [];
    const circuits = [];

    for (let i = 0; i < lines.length; i++) {
        for (let j = i + 1; j < lines.length; j++) {
            const distance = calculateDistance(lines[i], lines[j]);
            distances.push(distance);
            distancesToLoc.set(distance, [i, j]);
        }
    }

    distances.sort((a, b) => a - b);

    let connectionCount = 0;
    while (connectionCount < CONNECTIONS) {
        const shortestDistance = distances[connectionCount];
        const neighborsToConnect = distancesToLoc.get(shortestDistance);

        let circuitA = circuits.find((c) => c.has(neighborsToConnect[0]));
        let circuitB = circuits.find((c) => c.has(neighborsToConnect[1]));

        if (circuitA && circuitB && circuitA !== circuitB) {
            // Merge circuits
            for (const loc of circuitB) {
                circuitA.add(loc);
            }
            circuits.splice(circuits.indexOf(circuitB), 1);
        } else if (circuitA) {
            circuitA.add(neighborsToConnect[1]);
        } else if (circuitB) {
            circuitB.add(neighborsToConnect[0]);
        } else {
            const newCircuit = new Set([neighborsToConnect[0], neighborsToConnect[1]]);
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

        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
}
