import { Solution } from '#tools/solution.js';
import PriorityQueue from '#tools/queue.js';

export default function solve({ lines, rawData }) {
    class State {
        y;
        x;
        height;
        constructor(y, x, height) {
            this.y = y;
            this.x = x;
            this.height = height;
        }
    }
    const grid = lines.map((line) => line.split('').map(Number));

    const trailheads = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 0) {
                trailheads.push({ i, j });
            }
        }
    }

    const answer = trailheads.reduce((acc, { i, j }) => {
        let score = 0;
        let visitedPeaks = new Set();
        const queue = new PriorityQueue([new State(i, j, 0)], compare);
        while (queue.isNotEmpty()) {
            const current = queue.next();
            if (grid[current.y][current.x] === 9) {
                const key = `${current.x},${current.y}`;
                if (visitedPeaks.has(key)) {
                    continue;
                }
                score += 1;
                visitedPeaks.add(key);
                continue;
            }

            const neighbors = getNeighbors(current.x, current.y);
            for (let neighbor of neighbors) {
                const height = grid[neighbor.y][neighbor.x];
                if (height === current.height + 1) {
                    queue.insert(new State(neighbor.y, neighbor.x, height));
                }
            }
        }
        return acc + score;
    }, 0);

    return new Solution(answer);

    function compare(a, b) {
        return b.height - a.height;
    }

    function getNeighbors(x, y) {
        let neighbors = [];
        if (x > 0) {
            neighbors.push({ x: x - 1, y });
        }
        if (x < grid[0].length - 1) {
            neighbors.push({ x: x + 1, y });
        }
        if (y > 0) {
            neighbors.push({ x, y: y - 1 });
        }
        if (y < grid.length - 1) {
            neighbors.push({ x, y: y + 1 });
        }
        return neighbors;
    }
}
