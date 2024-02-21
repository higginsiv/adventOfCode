module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const { abs } = Math;
    function pointsWithinManhattanDistance(p1, distance) {
        let points = [];
        for (let dx = 0; dx <= distance; dx++) {
            for (let dy = 0; dy <= distance - dx; dy++) {
                for (let dz = 0; dz <= distance - dx - dy; dz++) {
                    points.push({ x: p1.x + dx, y: p1.y + dy, z: p1.z + dz });
                    points.push({ x: p1.x + dx, y: p1.y + dy, z: p1.z - dz });
                    points.push({ x: p1.x + dx, y: p1.y - dy, z: p1.z + dz });
                    points.push({ x: p1.x + dx, y: p1.y - dy, z: p1.z - dz });
                    points.push({ x: p1.x - dx, y: p1.y + dy, z: p1.z + dz });
                    points.push({ x: p1.x - dx, y: p1.y + dy, z: p1.z - dz });
                    points.push({ x: p1.x - dx, y: p1.y - dy, z: p1.z + dz });
                    points.push({ x: p1.x - dx, y: p1.y - dy, z: p1.z - dz });
                }
            }
        }
        return points;
    }

    function getKey(x, y, z) {
        return `${x},${y},${z}`;
    }

    function getDistance(p1, p2) {
        return abs(p1 - p2);
    }

    const nanobots = lines.map((line) => {
        let [x, y, z, range] = line.match(/-?\d+/g).map(Number);
        return { x, y, z, range };
    });

    let pointToBot = new Map();
    nanobots.forEach((bot) => {
        bot.points = pointsWithinManhattanDistance(bot, bot.range);
        bot.points.forEach((point) => {
            const key = getKey(point.x, point.y, point.z);
            if (!pointToBot.has(key)) {
                pointToBot.set(key, 0);
            }
            pointToBot.set(key, pointToBot.get(key) + 1);
        });
    });

    let max = 0;
    let bestPoints = [];
    for (let [key, value] of pointToBot) {
        if (value > max) {
            max = value;
            bestPoints = [{ key, value }];
        } else if (value === max) {
            bestPoints.push({ key, value });
        }
    }

    const answer = bestPoints.reduce((acc, point) => {
        const [x, y, z] = point.key.split(',').map(Number);
        return acc + getDistance(0, x) + getDistance(0, y) + getDistance(0, z);
    }, 0);

    return { value: answer };
}
