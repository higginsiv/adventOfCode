module.exports = {solve: solve};

function solve({lines, rawData}) {
    const { insertIntoSortedQueue } = require('../../../tools/iteration.js');
    const crypto = require('crypto');
    const OPEN = ['b', 'c', 'd', 'e', 'f'];
    const MAX = 3;

    let visited = new Set();
    let queue = [{x: 0, y: 0, path: '', pathLength: 0}];
    let answer;

    while (queue.length > 0) {
        let state = queue.shift();
        if (state.x === 3 && state.y === 3) {
            answer = Math.max(answer || 0, state.pathLength);
            continue;
        }

        let neighbors = getNeighbors(state);
        neighbors.forEach(neighbor => queue.push(neighbor));
    }

    function getHash(path) {
        return crypto.createHash('md5').update(rawData + path).digest("hex");
    }

    function getNeighbors(state) {
        let hash = getHash(state.path);
        let neighbors = [];
        if (OPEN.includes(hash[0]) && state.y > 0) {
            neighbors.push({x: state.x, y: state.y - 1, path: state.path + 'U', pathLength: state.pathLength + 1});
        }

        if (OPEN.includes(hash[1]) && state.y < MAX) {
            neighbors.push({x: state.x, y: state.y + 1, path: state.path + 'D', pathLength: state.pathLength + 1});
        }

        if (OPEN.includes(hash[2]) && state.x > 0) {
            neighbors.push({x: state.x - 1, y: state.y, path: state.path + 'L', pathLength: state.pathLength + 1});
        }

        if (OPEN.includes(hash[3]) && state.x < MAX) {
            neighbors.push({x: state.x + 1, y: state.y, path: state.path + 'R', pathLength: state.pathLength + 1});
        }

        return neighbors;
    }

    return {value: answer};
}