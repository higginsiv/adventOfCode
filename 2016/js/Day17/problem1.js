import crypto from 'crypto';
import PriorityQueue from '#tools/queue.js';

export default function solve({ lines, rawData }) {
    const OPEN = ['b', 'c', 'd', 'e', 'f'];
    const MAX = 3;

    let queue = new PriorityQueue(
        [{ x: 0, y: 0, path: '', pathLength: 0 }],
        (a, b) => a.pathLength - b.pathLength,
    );
    let answer;

    while (queue.isNotEmpty()) {
        let state = queue.next();

        if (state.x === MAX && state.y === MAX) {
            answer = state.path;
            break;
        }

        let neighbors = getNeighbors(state);
        neighbors.forEach((neighbor) => queue.insert(neighbor));
    }

    function getHash(path) {
        return crypto
            .createHash('md5')
            .update(rawData + path)
            .digest('hex');
    }

    function getNeighbors(state) {
        let hash = getHash(state.path);
        let neighbors = [];
        if (OPEN.includes(hash[0]) && state.y > 0) {
            neighbors.push({
                x: state.x,
                y: state.y - 1,
                path: state.path + 'U',
                pathLength: state.pathLength + 1,
            });
        }

        if (OPEN.includes(hash[1]) && state.y < MAX) {
            neighbors.push({
                x: state.x,
                y: state.y + 1,
                path: state.path + 'D',
                pathLength: state.pathLength + 1,
            });
        }

        if (OPEN.includes(hash[2]) && state.x > 0) {
            neighbors.push({
                x: state.x - 1,
                y: state.y,
                path: state.path + 'L',
                pathLength: state.pathLength + 1,
            });
        }

        if (OPEN.includes(hash[3]) && state.x < MAX) {
            neighbors.push({
                x: state.x + 1,
                y: state.y,
                path: state.path + 'R',
                pathLength: state.pathLength + 1,
            });
        }

        return neighbors;
    }

    return { value: answer };
}
