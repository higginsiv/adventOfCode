export default function solve({ lines, rawData }) {
    const { max } = Math;
    function getNeighbors(x, y) {
        return [
            { x: x + 1, y: y },
            { x: x - 1, y: y },
            { x: x, y: y + 1 },
            { x: x, y: y - 1 },
        ];
    }

    lines.splice(0, 2);

    let maxX = 0;
    let maxY = 0;
    let startX;
    let startY;

    lines = lines.map((line) => {
        let matches = line.match(/\d+/g);
        let x = parseInt(matches[0]);
        let y = parseInt(matches[1]);
        maxX = max(maxX, x);
        maxY = max(maxY, y);

        let used = parseInt(matches[3]);
        if (used === 0) {
            startX = x;
            startY = y;
        }

        return {
            x: x,
            y: y,
            used: used,
            avail: parseInt(matches[4]),
        };
    });

    let grid = Array.from(Array(maxY + 1), () => new Array(maxX + 1).fill(0));

    lines.forEach((node) => {
        if (node.used > 100) {
            grid[node.y][node.x] = '#';
        }
    });

    let visited = Array.from({ length: grid.length }, () => Array(grid[0].length).fill(false));

    let queue = [{ x: startX, y: startY, distance: 0 }];
    let distanceToGoal;

    while (queue.length > 0) {
        let { x, y, distance } = queue.shift();

        if (x === maxX && y === 0) {
            distanceToGoal = distance;
            break;
        }

        if (visited[y][x]) {
            continue;
        }
        visited[y][x] = true;

        const neighbors = getNeighbors(x, y);
        neighbors.forEach((neighbor) => {
            const { x, y } = neighbor;
            if (x >= 0 && y >= 0 && y < grid.length && x < grid[0].length && grid[y][x] !== '#') {
                queue.push({ x, y, distance: distance + 1 });
            }
        });
    }

    let answer = distanceToGoal + 5 * (maxX - 1);
    return { value: answer };
}
