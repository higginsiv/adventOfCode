export default function solve({ lines, rawData }) {
    const { abs } = Math;
    function calculateDistances(particle, time) {
        return {
            x: calculateDistance(particle.p.x, particle.v.x, particle.a.x, time),
            y: calculateDistance(particle.p.y, particle.v.y, particle.a.y, time),
            z: calculateDistance(particle.p.z, particle.v.z, particle.a.z, time),
        };
    }

    function calculateDistance(position, velocity, acceleration, time) {
        return position + velocity * time + 0.5 * acceleration * time ** 2;
    }

    const answer = lines
        .map((line) => {
            line = line.match(/-?\d+/g).map(Number);

            return {
                p: { x: line[0], y: line[1], z: line[2] },
                v: { x: line[3], y: line[4], z: line[5] },
                a: { x: line[6], y: line[7], z: line[8] },
            };
        })
        .reduce(
            (lowestManhattan, particle, index) => {
                const newPosition = calculateDistances(particle, 100000);
                const manhattan = abs(newPosition.x) + abs(newPosition.y) + abs(newPosition.z);

                if (manhattan < lowestManhattan.manhattan) {
                    lowestManhattan = { manhattan: manhattan, index: index };
                }

                return lowestManhattan;
            },
            { manhattan: Infinity, index: -1 },
        ).index;

    return { value: answer };
}
