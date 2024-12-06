import PriorityQueue from '#tools/queue.js';

export default function solve({ lines, rawData }) {
    const { abs } = Math;
    const favoriteNumber = Number(rawData);
    let answer;
    const [OPEN, WALL] = ['.', '#'];
    const [GOAL_X, GOAL_Y] = [31, 39];

    let locationToType = new Map();
    let locationToHScore = new Map();
    let visited = new Map();
    visited.set('1,1', 0);

    let queue = new PriorityQueue([{ x: 1, y: 1, distance: 0 }], (a, b) => a.fScore - b.fScore);

    while (queue.isNotEmpty()) {
        let { x, y, distance } = queue.next();

        if (x === GOAL_X && y === GOAL_Y) {
            answer = distance;
            break;
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
                let fScore = getFScore(x, y, nextDistance);
                visited.set(neighborKey, nextDistance);
                queue.insert({ x, y, distance: nextDistance, fScore: fScore });
            }
        });
    }

    function getFScore(x, y, distance) {
        return distance + getHScore(x, y);
    }

    function getHScore(x, y) {
        const key = `${x},${y}`;
        if (locationToHScore.has(key)) {
            return locationToHScore.get(key);
        }
        const hScore = abs(x - GOAL_X) + abs(y - GOAL_Y);
        locationToHScore.set(key, hScore);
        return hScore;
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

    return { value: answer };
}
