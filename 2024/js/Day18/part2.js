import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    lines = lines.map((line) => line.split(',').map(Number));
    const SIZE = 70;
    const [EMPTY, CORRUPTED] = [0, 1];
    const grid = Array.from({ length: SIZE + 1 }, () =>
        Array.from({ length: SIZE + 1 }, () => {
            return { value: EMPTY, flooded: false };
        }),
    );

    for (let i = 0; i < lines.length; i++) {
        const [x, y] = lines[i];
        grid[y][x].value = CORRUPTED;
    }

    const DIRECTIONS = [
        [0, -1],
        [1, 0],
        [0, 1],
        [-1, 0],
    ];

    let foundEnd = flood({ x: 0, y: 0 });

    let corruptionIndex = lines.length;
    while (!foundEnd) {
        corruptionIndex--;
        const [x, y] = lines[corruptionIndex];
        grid[y][x].value = EMPTY;

        for (let i = 0; i < DIRECTIONS.length; i++) {
            const [dx, dy] = DIRECTIONS[i];
            if (grid[y + dy] && grid[y + dy][x + dx] && grid[y + dy][x + dx].flooded) {
                foundEnd = flood({ x, y });
                break;
            }
        }
    }

    return new Solution(`${lines[corruptionIndex][0]},${lines[corruptionIndex][1]}`);

    function flood(start) {
        if (start.x === SIZE && start.y === SIZE) {
            return true;
        }

        let foundEnd = false;

        for (let i = 0; i < DIRECTIONS.length; i++) {
            const [dx, dy] = DIRECTIONS[i];
            const [nx, ny] = [start.x + dx, start.y + dy];
            if (nx < 0 || nx > SIZE || ny < 0 || ny > SIZE) {
                continue;
            }

            if (grid[ny][nx].flooded || grid[ny][nx].value === CORRUPTED) {
                continue;
            }

            grid[ny][nx].flooded = true;
            foundEnd = flood({ x: nx, y: ny });

            if (foundEnd) {
                break;
            }
        }
        return foundEnd;
    }
}
