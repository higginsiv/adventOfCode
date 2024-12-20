import { Solution } from '#tools/solution.js';
import PriorityQueue from '#tools/queue.js';

export default function solve({ lines, rawData }) {
    const [WALL, EMPTY] = ['#', '.'];
    const DIRECTIONS = [
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
    ];
    let grid = resetGrid();

    const { start, end } = getStartAndEnd();

    const { time, path } = simulate();
    const MARGIN = 100;
    const maxTimeAllowed = time - MARGIN;

    let cellToTime = new Map();
    path.forEach((cell, index) => {
        cellToTime.set(`${cell.x},${cell.y}`, index);
    });

    let wallsTested = new Set();

    const answer = path.reduce((acc, { x, y }, index) => {
        const walledNeighbors = getWalledNeighbors({ x, y });
        let cheatsThatWork = 0;
        walledNeighbors.forEach((walled) => {
            const key = `${walled.x},${walled.y}`;
            if (!wallsTested.has(key)) {
                wallsTested.add(key);
                grid = resetGrid(index);

                grid[walled.y][walled.x].val = EMPTY;

                const result = simulate(
                    {
                        x: walled.x,
                        y: walled.y,
                        time: index + 1,
                        path: [{ x: walled.x, y: walled.y }],
                        passedCheatSpot: false,
                    },
                    maxTimeAllowed,
                    { x: walled.x, y: walled.y },
                );

                if (!result.failed) {
                    if (result.time <= maxTimeAllowed) {
                        cheatsThatWork++;
                    }
                }

                grid[walled.y][walled.x].val = WALL;
            }
        });
        return acc + cheatsThatWork;
    }, 0);

    return new Solution(answer);

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

    function simulate(init, maxTime = Infinity, cheatSpot) {
        const queue = new PriorityQueue(
            init
                ? [init]
                : [
                      {
                          ...start,
                          time: 0,
                          path: [{ x: start.x, y: start.y }],
                          passedCheatSpot: false,
                      },
                  ],
            (a, b) => {
                if (a.passedCheatSpot && !b.passedCheatSpot) {
                    return -1;
                } else if (!a.passedCheatSpot && b.passedCheatSpot) {
                    return 1;
                }
                return a.time - b.time;
            },
        );

        while (queue.isNotEmpty()) {
            let current = queue.next();

            if (current.x === end.x && current.y === end.y) {
                return current;
            }

            if (current.time + manhattanDistance(current) > maxTime) {
                return { failed: true };
            }

            if (cheatSpot && current.passedCheatSpot) {
                let originalPathTime = cellToTime.get(`${current.x},${current.y}`) ?? -1;
                if (originalPathTime !== -1) {
                    if (current.time > originalPathTime - MARGIN) {
                        return { failed: true };
                    } else {
                        return current;
                    }
                }
            }

            // TODO can remove as this happens on start of cheats every time
            if (cheatSpot && current.x === cheatSpot.x && current.y === cheatSpot.y) {
                current.passedCheatSpot = true;
            }

            DIRECTIONS.forEach((dir) => {
                let x = current.x + dir.x;
                let y = current.y + dir.y;
                if (x < 0 || x >= grid[0].length || y < 0 || y >= grid.length) {
                    return;
                }

                if (
                    grid[y][x].val !== WALL &&
                    (current.path.length <= 1 ||
                        current.path[current.path.length - 2].x !== x ||
                        current.path[current.path.length - 2].y !== y) &&
                    grid[y][x].visited > current.time + 1
                ) {
                    grid[y][x].visited = current.time + 1;
                    queue.insert({
                        x,
                        y,
                        time: current.time + 1,
                        path: [...current.path, { x, y }],
                        passedCheatSpot: current.passedCheatSpot,
                    });
                }
            });
        }
        return { failed: true };
    }

    function getWalledNeighbors(current) {
        let walled = [];
        DIRECTIONS.forEach((dir) => {
            let x = current.x + dir.x;
            let y = current.y + dir.y;
            if (x < 0 || x >= grid[0].length || y < 0 || y >= grid.length) {
                return;
            }
            if (grid[y][x].val === WALL) {
                walled.push({ x, y });
            }
        });
        return walled;
    }

    function resetGrid(index) {
        let grid = lines.map((line) =>
            line.split('').map((char) => {
                return {
                    val: char,
                    visited: Infinity,
                };
            }),
        );

        if (index) {
            for (let i = 0; i <= index; i++) {
                grid[path[i].y][path[i].x].visited = -Infinity;
            }
        }

        return grid;
    }

    function manhattanDistance(a) {
        return Math.abs(a.x - end.x) + Math.abs(a.y - end.y);
    }
}

// TODO after making efficieny adjustments I'm now wrong
// I think my assumption that I could destroy blocks only near the path is wrong.
// I could destroy any block and then check if it creates a new shorter path
// I'm not sure why the original solution worked. Perhaps my assumption is good for the designed inputs or maybe I was lucky


// New plan:
// When getting neighbors, if blocks left > 0, add neighbors with walls
// Sort queue by time
// Avoid neighbor if time >= visited.time && squaresRemaining <= visited.remaining