export default function solve({ lines, rawData }) {
    const { max } = Math;
    const [FOREST, PATH] = ['#', '.'];
    const [NORTH, EAST, SOUTH, WEST] = ['^', '>', 'v', '<'];

    let start = { x: 0, y: 0 };
    let goal;
    const GRID = lines.map((line, index, grid) => {
        if (index === 0) {
            start.y = line.indexOf(PATH);
        }

        if (index === grid.length - 1) {
            goal = { x: index, y: line.indexOf(PATH) };
        }

        line = line.split('');
        return line;
    });

    let distances = Array.from({ length: GRID.length }, () =>
        Array(GRID[0].length).fill(-Infinity),
    );

    let longestTrip = -Infinity;
    let queue = [{ point: start, distance: 0, visited: new Set() }];

    while (queue.length > 0) {
        let current = queue.shift();

        if (current.point.x === goal.x && current.point.y === goal.y) {
            longestTrip = max(longestTrip, current.distance);
            continue;
        }

        let neighbors = getValidNeighbors(current.point, GRID[current.point.x][current.point.y]);

        neighbors.forEach((neighbor) => {
            let neighborKey = generateKey(neighbor.x, neighbor.y);
            if (current.visited.has(neighborKey)) {
                return;
            }

            if (GRID[neighbor.x][neighbor.y] === FOREST) {
                return;
            }

            if (distances[neighbor.x][neighbor.y] > current.distance + 1) {
                return;
            }

            current.visited.add(neighborKey);
            distances[neighbor.x][neighbor.y] = current.distance + 1;
            queue.push({
                point: neighbor,
                distance: current.distance + 1,
                visited: new Set(current.visited),
            });
        });
    }

    function getValidNeighbors(point, value) {
        let neighbors = [];

        let includeNorth = point.x > 0 && value !== EAST && value !== WEST && value !== SOUTH;
        let includeEast =
            point.y < GRID[0].length - 1 && value !== NORTH && value !== WEST && value !== SOUTH;
        let includeSouth =
            point.x < GRID.length - 1 && value !== EAST && value !== WEST && value !== NORTH;
        let includeWest = point.y > 0 && value !== EAST && value !== NORTH && value !== SOUTH;

        if (includeNorth) {
            neighbors.push({ x: point.x - 1, y: point.y });
        }

        if (includeEast) {
            neighbors.push({ x: point.x, y: point.y + 1 });
        }

        if (includeSouth) {
            neighbors.push({ x: point.x + 1, y: point.y });
        }

        if (includeWest) {
            neighbors.push({ x: point.x, y: point.y - 1 });
        }

        return neighbors;
    }

    function generateKey(x, y) {
        return `${x},${y}`;
    }

    const answer = longestTrip;
    return { value: answer };
}
