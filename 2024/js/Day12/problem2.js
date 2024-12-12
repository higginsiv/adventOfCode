import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    const [NORTH_MOD, SOUTH_MOD, WEST_MOD, EAST_MOD] = [0.1, 0.2, 0.3, 0.4];
    const grid = lines.map((line) => {
        return line.split('').map((char) => {
            return {
                char: char,
                visited: false,
            };
        });
    });
    let answer = 0;

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const cell = grid[i][j];
            if (cell.visited) {
                continue;
            }
            let area = 0;
            let horizontalSegments = new Map();
            let verticalSegments = new Map();
            let queue = [{ i, j }];
            while (queue.length > 0) {
                let current = queue.shift();
                if (grid[current.i][current.j].visited) {
                    continue;
                }
                area++;
                grid[current.i][current.j].visited = true;
                let neighbors = getNeighbors(current.i, current.j, grid);
                neighbors.forEach((neighbor, index) => {
                    if (index === 0) {
                        // North Neighbor
                        if (neighbor.i < 0 || grid[neighbor.i][neighbor.j].char !== cell.char) {
                            const row = current.i + NORTH_MOD;
                            let segments = horizontalSegments.get(row) || [];
                            segments.push({ start: current.j, end: current.j + 1 });
                            horizontalSegments.set(row, segments);
                            combineSegments(row, horizontalSegments);
                            return;
                        }
                    }

                    if (index === 1) {
                        // South Neighbor
                        if (
                            neighbor.i >= grid.length ||
                            grid[neighbor.i][neighbor.j].char !== cell.char
                        ) {
                            const row = current.i + 1 + SOUTH_MOD;
                            let segments = horizontalSegments.get(row) || [];
                            segments.push({
                                start: current.j,
                                end: current.j + 1,
                            });
                            horizontalSegments.set(row, segments);
                            combineSegments(row, horizontalSegments);
                            return;
                        }
                    }

                    if (index === 2) {
                        // West Neighbor
                        if (neighbor.j < 0 || grid[neighbor.i][neighbor.j].char !== cell.char) {
                            const col = current.j + WEST_MOD;
                            let segments = verticalSegments.get(col) || [];
                            segments.push({ start: current.i, end: current.i + 1 });
                            verticalSegments.set(col, segments);
                            combineSegments(col, verticalSegments);
                            return;
                        }
                    }

                    if (index === 3) {
                        // East Neighbor
                        if (
                            neighbor.j >= grid[0].length ||
                            grid[neighbor.i][neighbor.j].char !== cell.char
                        ) {
                            const col = current.j + 1 + EAST_MOD;
                            let segments = verticalSegments.get(col) || [];
                            segments.push({
                                start: current.i,
                                end: current.i + 1,
                            });
                            verticalSegments.set(col, segments);
                            combineSegments(col, verticalSegments);
                            return;
                        }
                    }

                    queue.push(neighbor);
                });
            }

            const sides =
                [...horizontalSegments.entries()].reduce((acc, [row, segments]) => {
                    return acc + segments.length;
                }, 0) +
                [...verticalSegments.entries()].reduce((acc, [col, segments]) => {
                    return acc + segments.length;
                }, 0);

            answer += area * sides;
        }
    }
    return new Solution(answer);

    function getNeighbors(i, j, grid) {
        return [
            { i: i - 1, j: j },
            { i: i + 1, j: j },
            { i: i, j: j - 1 },
            { i: i, j: j + 1 },
        ];
    }

    function combineSegments(key, segmentsMap) {
        let segments = segmentsMap.get(key) || [];
        segments.sort((a, b) => a.start - b.start);
        let combined = [];
        let start = segments[0].start;
        let end = segments[0].end;
        for (let i = 1; i < segments.length; i++) {
            if (segments[i].start <= end) {
                end = segments[i].end;
            } else {
                combined.push({ start, end });
                start = segments[i].start;
                end = segments[i].end;
            }
        }
        combined.push({ start, end });
        segmentsMap.set(key, combined);
    }
}
