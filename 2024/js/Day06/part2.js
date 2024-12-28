import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    const [NORTH, EAST, SOUTH, WEST] = [0, 1, 2, 3];
    const DELTAS = new Map([
        [NORTH, { x: 0, y: -1 }],
        [EAST, { x: 1, y: 0 }],
        [SOUTH, { x: 0, y: 1 }],
        [WEST, { x: -1, y: 0 }],
    ]);
    const [OBSTACLE, GUARD] = ['#', '^'];

    const grid = lines.map((line) => line.split(''));
    const guard = getGuardPosition(grid);
    const startKey = getKey(guard.x, guard.y, guard.dir);

    const originalVisited = new Set([startKey]);
    navigate(grid, {...guard}, originalVisited);

    let cycleStarters = new Set();
    [...originalVisited].forEach((key) => {
        const [x, y, dir] = key.split(',').map(Number);
        if (x === guard.x && y === guard.y) {
            return;
        }

        const temp = grid[y][x];
        grid[y][x] = OBSTACLE;

        const createsCycle = navigate(
            grid,
            { ...guard },
            new Set([startKey]),
        );

        if (createsCycle) {
            cycleStarters.add(`${x},${y}`);
        }
        grid[y][x] = temp;
    });

    const answer = cycleStarters.size;
    return new Solution(answer);

    function navigate(grid, guard, visited) {
        while (
            guard.x > 0 &&
            guard.y > 0 &&
            guard.x < grid[0].length - 1 &&
            guard.y < grid.length - 1
        ) {
            const delta = DELTAS.get(guard.dir);

            const nextX = guard.x + delta.x;
            const nextY = guard.y + delta.y;
            if (grid[nextY][nextX] === OBSTACLE) {
                guard.dir = getNextDirection(guard.dir);
            } else {
                guard.x = nextX;
                guard.y = nextY;
                const key = getKey(guard.x, guard.y, guard.dir);
                if (visited.has(key)) {
                    return true;
                }
                visited.add(key);
            }
        }

        return false;
    }

    function getGuardPosition(grid) {
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                if (grid[y][x] === GUARD) {
                    return { x, y, dir: NORTH };
                }
            }
        }
    }

    function getKey(x, y, dir) {
        return `${x},${y},${dir}`;
    }

    function getNextDirection(direction) {
        return (direction + 1) % 4;
    }
}
