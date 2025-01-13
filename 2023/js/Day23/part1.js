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

    const pointToLongestTrip = new Map();
    let queue = [{ point: start, distance: 0, visited: new Set() }];

    while (queue.length > 0) {
        let current = queue.pop();

        const key = generateKey(current.point.x, current.point.y);
        const longestTripToPoint = max(pointToLongestTrip.get(key) || -Infinity, current.distance);
        pointToLongestTrip.set(key, longestTripToPoint);

        if (current.point.x === goal.x && current.point.y === goal.y) {
            continue;
        }

        let neighbors = getValidNeighbors(current.point, GRID[current.point.x][current.point.y]);

        neighbors.forEach((neighbor) => {
            let neighborKey = generateKey(neighbor.x, neighbor.y);
            if (current.visited.has(neighborKey)) {
                return;
            }

            if (pointToLongestTrip.get(neighborKey) >= current.distance + 1) {
                return;
            }

            if (GRID[neighbor.x][neighbor.y] === FOREST) {
                return;
            }

            current.visited.add(neighborKey);
            queue.push({
                point: neighbor,
                distance: current.distance + 1,
                visited: new Set(current.visited),
            });
        });
    }

    function getValidNeighbors(point, value) {
        let neighbors = [];

        const includeNorth = point.x > 0 && value !== EAST && value !== WEST && value !== SOUTH;
        const includeEast =
            point.y < GRID[0].length - 1 && value !== NORTH && value !== WEST && value !== SOUTH;
        const includeSouth =
            point.x < GRID.length - 1 && value !== EAST && value !== WEST && value !== NORTH;
        const includeWest = point.y > 0 && value !== EAST && value !== NORTH && value !== SOUTH;

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

    const answer = pointToLongestTrip.get(generateKey(goal.x, goal.y));
    return { value: answer };
}
