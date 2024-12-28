import PriorityQueue from '#tools/queue.js';

export default function solve({ lines, rawData }) {
    const favoriteNumber = Number(rawData);
    const [OPEN, WALL] = ['.', '#'];

    let locationToType = new Map();
    let visited = new Map();
    visited.set('1,1', 0);

    let uniqueVisits = 1;

    let queue = new PriorityQueue([{ x: 1, y: 1, distance: 0 }], (a, b) => a.distance - b.distance);

    while (queue.isNotEmpty()) {
        let { x, y, distance } = queue.next();

        if (distance === 50) {
            continue;
        }

        let neighbors = getNeighbors(x, y);
        neighbors.forEach((neighbor) => {
            let { x, y } = neighbor;
            let neighborKey = `${x},${y}`;
            if (visited.has(neighborKey) && visited.get(neighborKey) <= distance) {
                return;
            }

            if (x >= 0 && y >= 0 && getLocationType(x, y) === OPEN) {
                let nextDistance = distance + 1;

                if (!visited.has(neighborKey)) {
                    uniqueVisits++;
                }

                visited.set(neighborKey, nextDistance);
                queue.insert({ x, y, distance: nextDistance });
            }
        });
    }

    function getNeighbors(x, y) {
        return [
            { x: x + 1, y: y },
            { x: x - 1, y: y },
            { x: x, y: y + 1 },
            { x: x, y: y - 1 },
        ];
    }

    function getLocationType(x, y) {
        let key = `${x},${y}`;
        if (locationToType.has(key)) {
            return locationToType.get(key);
        }

        let value = x * x + 3 * x + 2 * x * y + y + y * y + favoriteNumber;
        let oneCounts = value.toString(2).match(/1/g)?.length || 0;
        let type = oneCounts % 2 === 0 ? OPEN : WALL;
        locationToType.set(key, type);

        return type;
    }

    let answer = uniqueVisits;
    return { value: answer };
}
