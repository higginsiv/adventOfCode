export default function solve({ lines, rawData }) {
    const { round } = Math;
    const FILLED = 1;
    const [UP, DOWN, LEFT, RIGHT] = ['U', 'D', 'L', 'R'];

    let points = new Map();
    // TODO this map is pointless. Just use a set.
    points.set(generateKey(0, 0), FILLED);
    let location = [0, 0];

    lines
        .map((line) => {
            const matches = line.match(/(\w+)/g);
            return {
                direction: matches[0],
                distance: parseInt(matches[1]),
            };
        })
        .forEach((instruction) => {
            switch (instruction.direction) {
                case UP:
                    for (let i = 0; i < instruction.distance; i++) {
                        location[1]++;
                        points.set(generateKey(location[0], location[1]), FILLED);
                    }
                    break;
                case DOWN:
                    for (let i = 0; i < instruction.distance; i++) {
                        location[1]--;
                        points.set(generateKey(location[0], location[1]), FILLED);
                    }
                    break;
                case RIGHT:
                    for (let i = 0; i < instruction.distance; i++) {
                        location[0]++;
                        points.set(generateKey(location[0], location[1]), FILLED);
                    }
                    break;
                case LEFT:
                    for (let i = 0; i < instruction.distance; i++) {
                        location[0]--;
                        points.set(generateKey(location[0], location[1]), FILLED);
                    }
                    break;
            }
        });

    let pointInsidePolygon = calculateCenter([...points.keys()]);

    const answer = floodFill(pointInsidePolygon[0], pointInsidePolygon[1], points);

    function calculateCenter(points) {
        let x = 0,
            y = 0;
        points
            .map((point) => {
                return point.split(',').map((x) => parseInt(x));
            })
            .forEach((point) => {
                x += point[0];
                y += point[1];
            });

        return [round(x / points.length), round(y / points.length)];
    }

    function floodFill(startX, startY, points) {
        let queue = [[startX, startY]];
        let border = [...points.keys()];
        let visited = new Set();

        while (queue.length > 0) {
            let [x, y] = queue.shift();

            let locationKey = generateKey(x, y);

            if (border.includes(locationKey) || visited.has(locationKey)) {
                continue;
            }

            visited.add(locationKey);

            queue.push([x - 1, y]);
            queue.push([x + 1, y]);
            queue.push([x, y - 1]);
            queue.push([x, y + 1]);
        }

        return visited.size + border.length;
    }

    function generateKey(x, y) {
        return `${x},${y}`;
    }
    return { value: answer };
}
