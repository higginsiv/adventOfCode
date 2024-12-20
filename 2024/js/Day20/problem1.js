import { Solution } from '#tools/solution.js';
import PriorityQueue from '#tools/queue.js';
import { max } from 'bigint-crypto-utils';

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
    const answer = path.reduce((acc, current, index) => {
        const points = getAllPointsWithinDistance(current, CHEATS);
        let cheatsThatWork = 0;
        points.forEach((point) => {
            if (point.x < 0 || point.x >= grid[0].length || point.y < 0 || point.y >= grid.length) {
                return;
            }

            const locationOnPath = path.findIndex((p) => p.x === point.x && p.y === point.y);
            if (locationOnPath === -1) {
                return;
            }

            const timeSaved = locationOnPath - index - point.md;
            if (timeSaved >= MARGIN) {
                cheatsThatWork++;
            }
        });
        return acc + cheatsThatWork;
    }, 0);

    return new Solution(answer);

    function simulate() {
        let queue = new PriorityQueue(
            {
                x: start.x,
                y: start.y,
                time: 0,
                path: [{ x: start.x, y: start.y }],
            },
            (a, b) => a.time - b.time,
        );

        while (queue.isNotEmpty()) {
            let current = queue.next();

            if (current.x === end.x && current.y === end.y) {
                return current;
            }

            DIRECTIONS.forEach((dir) => {
                let x = current.x + dir.x;
                let y = current.y + dir.y;
                if (x < 0 || x >= grid[0].length || y < 0 || y >= grid.length) {
                    return;
                }

                if (grid[y][x].val === WALL) {
                    return;
                }

                if (
                    current.path.length > 1 &&
                    current.path[current.path.length - 2].x === x &&
                    current.path[current.path.length - 2].y === y
                ) {
                    return;
                }

                if (grid[y][x].visited <= current.time + 1) {
                    return;
                }

                grid[y][x].visited = current.time + 1;

                queue.insert({
                    x,
                    y,
                    time: current.time + 1,
                    path: [...current.path, { x, y }],
                });
            });
        }
        return [];
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

    // TODO adjust this to onlly go thru walls at first
    function getAllPointsWithinDistance(start, distance) {
        let points = [];
        let adjacentWalls = [];

        DIRECTIONS.forEach((dir) => {
            let x = start.x + dir.x;
            let y = start.y + dir.y;
            if (x < 0 || x >= grid[0].length || y < 0 || y >= grid.length) {
                return;
            }
            if (grid[y][x].val === WALL) {
                adjacentWalls.push({ x, y });
            }
        });

        distance--;
        adjacentWalls.forEach((wall) => {
            for (let dx = -distance; dx <= distance; dx++) {
                for (let dy = -distance; dy <= distance; dy++) {
                    const md = Math.abs(dx) + Math.abs(dy);
                    if (md <= distance) {
                        if (
                            !points.find(
                                (point) => point.x === wall.x + dx && point.y === wall.y + dy,
                            )
                        ) {
                            points.push({ x: wall.x + dx, y: wall.y + dy, md: md + 1 });
                        }
                    }
                }
            }
        });

        return points;
    }
}
