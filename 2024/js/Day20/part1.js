import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    const [WALL, EMPTY] = ['#', '.'];
    const MARGIN = 100;
    const CHEATS = 2;

    const DIRECTIONS = [
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
    ];
    let grid = resetGrid();

    const { start, end } = getStartAndEnd();
    const { time, path } = simulate();
    let pointToTime = new Map();
    path.forEach((point, index) => {
        pointToTime.set(`${point.x},${point.y}`, index);
    });

    const answer = path.reduce((acc, current, indexOfPath) => {
        const pointsReachableByCheating = getAllPointsWithinDistance(current, CHEATS);
        let cheatsThatWork = 0;
        pointsReachableByCheating.forEach((point) => {
            const key = `${point.x},${point.y}`;
            const indexReachedByCheating = pointToTime.get(key) ?? -1;
            if (indexReachedByCheating === -1) {
                return;
            }

            const timeSaved = indexReachedByCheating - indexOfPath - point.md;
            if (timeSaved >= MARGIN) {
                cheatsThatWork++;
            }
        });
        return acc + cheatsThatWork;
    }, 0);

    return new Solution(answer);

    function simulate() {
        let next = { x: start.x, y: start.y, time: 0 };
        let path = [{ x: start.x, y: start.y }];
        while (next != null) {
            let current = next;
            next = null;

            if (current.x === end.x && current.y === end.y) {
                return { time: current.time, path };
            }

            for (let i = 0; i < DIRECTIONS.length; i++) {
                let dir = DIRECTIONS[i];
                let x = current.x + dir.x;
                let y = current.y + dir.y;
                if (x < 0 || x >= grid[0].length || y < 0 || y >= grid.length) {
                    continue;
                }

                if (grid[y][x].val === WALL) {
                    continue;
                }

                if (
                    path.length > 1 &&
                    path[path.length - 2].x === x &&
                    path[path.length - 2].y === y
                ) {
                    continue;
                }

                if (grid[y][x].visited <= current.time + 1) {
                    continue;
                }

                grid[y][x].visited = current.time + 1;

                next = {
                    x,
                    y,
                    time: current.time + 1,
                };
                path.push({ x, y });
                break;
            }
        }
    }

    function resetGrid() {
        let grid = lines.map((line) =>
            line.split('').map((char) => {
                return {
                    val: char,
                    visited: Infinity,
                };
            }),
        );

        return grid;
    }

    function getStartAndEnd() {
        let start, end;
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                if (grid[y][x].val === 'S') {
                    start = { x, y };
                } else if (grid[y][x].val === 'E') {
                    end = { x, y };
                }
                if (start && end) {
                    return { start, end };
                }
            }
        }
    }

    function getAllPointsWithinDistance(start, distance) {
        let points = [];

        for (let dx = -distance; dx <= distance; dx++) {
            for (let dy = -distance; dy <= distance; dy++) {
                const newX = start.x + dx;
                const newY = start.y + dy;
                if (newX < 0 || newX >= grid[0].length || newY < 0 || newY >= grid.length) {
                    continue;
                }

                if (grid[newY][newX].val === WALL) {
                    continue;
                }

                const md = Math.abs(dx) + Math.abs(dy);
                if (md <= distance) {
                    points.push({ x: start.x + dx, y: start.y + dy, md: md });
                }
            }
        }

        return points;
    }
}
