import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
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

    distanceIndex = 0;
    let answer = 0;

    while (true) {
        const combined = distances[distanceIndex++];
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

        if (circuits.length === 1 && circuits[0].size === lines.length) {
            answer = lines[locA].x * lines[locB].x;
            break;
        }
    }

    circuits.sort((a, b) => b.size - a.size);

    return new Solution(answer);

    function calculateDistance(pointA, pointB) {
        const dx = pointA.x - pointB.x;
        const dy = pointA.y - pointB.y;
        const dz = pointA.z - pointB.z;

        return dx * dx + dy * dy + dz * dz;
    }
}
