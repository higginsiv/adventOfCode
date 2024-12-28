import { Solution } from '#tools/solution.js';
import PriorityQueue from '#tools/queue.js';

export default function solve({ lines, rawData }) {
    lines = lines.map((line) => line.split(',').map(Number));
    const SIZE = 70;
    const [EMPTY, CORRUPTED] = [0, 1];
    const grid = Array.from({ length: SIZE + 1 }, () =>
        Array.from({ length: SIZE + 1 }, () => {
            return { value: EMPTY, steps: Infinity };
        }),
    );

    for (let i = 0; i < 1024; i++) {
        const [x, y] = lines[i];
        grid[y][x].value = CORRUPTED;
    }

    const DIRECTIONS = [
        [0, -1],
        [1, 0],
        [0, 1],
        [-1, 0],
    ];

    const queue = new PriorityQueue({ x: 0, y: 0, steps: 0 }, (a, b) => {
        let manhattanA = Math.abs(a.x - SIZE) + Math.abs(a.y - SIZE);
        let manhattanB = Math.abs(b.x - SIZE) + Math.abs(b.y - SIZE);
        return a.steps + manhattanA - (b.steps + manhattanB);
    });

    let answer = 0;
    while (queue.isNotEmpty()) {
        let current = queue.next();
        grid[current.y][current.x].steps = current.steps;
        if (current.x === SIZE && current.y === SIZE) {
            answer = current.steps;
            break;
        }

        DIRECTIONS.forEach(([dx, dy]) => {
            const [nx, ny] = [current.x + dx, current.y + dy];
            if (nx < 0 || nx > SIZE || ny < 0 || ny > SIZE) {
                return;
            }

            if (grid[ny][nx].value === CORRUPTED || grid[ny][nx].steps <= current.steps + 1) {
                return;
            }

            queue.insert({ x: nx, y: ny, steps: current.steps + 1 });
        });
    }

    return new Solution(answer);
}
