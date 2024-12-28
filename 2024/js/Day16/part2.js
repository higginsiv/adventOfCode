import { Solution } from '#tools/solution.js';
import PriorityQueue from '#tools/queue.js';

export default function solve({ lines, rawData }) {
    const [NORTH, EAST, SOUTH, WEST] = [0, 1, 2, 3];
    const DELTAS = [
        { x: 0, y: -1, dir: NORTH },
        { x: 1, y: 0, dir: EAST },
        { x: 0, y: 1, dir: SOUTH },
        { x: -1, y: 0, dir: WEST },
    ];
    const grid = lines.map((line) => {
        return line.split('').map((char) => {
            return {
                char: char,
                visitedScore: new Map([
                    [NORTH, Infinity],
                    [EAST, Infinity],
                    [SOUTH, Infinity],
                    [WEST, Infinity],
                ]),
            };
        });
    });

    let current = getStart();

    const queue = new PriorityQueue(current, (a, b) => a.score - b.score);

    let lowestScore;
    let visitedSet = new Set();
    while (queue.isNotEmpty()) {
        current = queue.next();

        if (grid[current.y][current.x].char === 'E') {
            if (lowestScore === undefined) {
                lowestScore = current.score;
            }
            if (current.score > lowestScore) {
                break;
            }
            visitedSet = new Set([...visitedSet, ...current.visited]);
            continue;
        }

        addNeighbors(current);
    }

    const answer = visitedSet.size + 1;
    return new Solution(answer);

    function addNeighbors(current) {
        DELTAS.forEach((delta) => {
            const x = current.x + delta.x;
            const y = current.y + delta.y;

            if (x < 0 || x >= grid[0].length || y < 0 || y >= grid.length) {
                return;
            }

            const neighbor = grid[y][x];
            if (neighbor.char === '#') {
                return;
            }

            const score = current.score + getScoreModifier(current, delta);

            // TODO - if the score is equal I should be able to bail out early, add in my current visited to the set
            // This only works if I know the neighbor is part of a valid path
            if (neighbor.visitedScore.get(delta.dir) < score) {
                return;
            }

            neighbor.visitedScore.set(delta.dir, score);
            
            queue.insert({ x, y, dir: delta.dir, score, visited: new Set([...current.visited, getKey(x, y)])});
        });
    }

    function getStart() {
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                if (grid[y][x].char === 'S') {
                    return { x, y, dir: EAST, score: 0, visited: new Set() };
                }
            }
        }
    }

    function getScoreModifier(current, delta) {
        if (current.dir === delta.dir) {
            return 1;
        }

        const numberOfTurns = Math.abs(current.dir - delta.dir) === 2 ? 2 : 1;
        return 1000 * numberOfTurns + 1;
    }

    function getKey(x, y) {
        return `${x},${y}`;
    }
}
