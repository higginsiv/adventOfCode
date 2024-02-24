module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const { abs, min, max, floor } = Math;
    const PriorityQueue = require('../../../tools/queue.js');
    const OctreeNode = require('../../../tools/octree.js');

    function getDistance(p1, p2) {
        return abs(p1 - p2);
    }

    function compare(a, b) {
        if (a.count === b.count) {
            return b.level - a.level;
        }
        return b.count - a.count;
    }

    function getShortestDistance(bot, boxMinCorner, boxMaxCorner) {
        let dx = max(boxMinCorner.x - bot.x, 0, bot.x - boxMaxCorner.x);
        let dy = max(boxMinCorner.y - bot.y, 0, bot.y - boxMaxCorner.y);
        let dz = max(boxMinCorner.z - bot.z, 0, bot.z - boxMaxCorner.z);
        return dx + dy + dz;
    }

    let minRange = Infinity;
    const nanobots = lines.map((line) => {
        let [x, y, z, range] = line.match(/-?\d+/g).map(Number);
        minRange = min(minRange, range);
        return { x, y, z, range };
    });

    let minX = Infinity;
    let minY = Infinity;
    let minZ = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    let maxZ = -Infinity;
    nanobots.forEach((bot) => {
        minX = min(minX, bot.x - bot.range);
        minY = min(minY, bot.y - bot.range);
        minZ = min(minZ, bot.z - bot.range);
        maxX = max(maxX, bot.x + bot.range);
        maxY = max(maxY, bot.y + bot.range);
        maxZ = max(maxZ, bot.z + bot.range);
    });

    let root = new OctreeNode(minX, minY, minZ, maxX, maxY, maxZ);
    root.count = 0;
    root.level = 0;

    let queue = new PriorityQueue([root], compare);
    let maxBots = 0;
    let shortestManhattan = Infinity;

    while (queue.isNotEmpty()) {
        let node = queue.next();

        if (
            node.boundingBox.minX === node.boundingBox.maxX &&
            node.boundingBox.minY === node.boundingBox.maxY &&
            node.boundingBox.minZ === node.boundingBox.maxZ
        ) {
            maxBots = max(maxBots, node.count);
            if (node.count === maxBots) {
                shortestManhattan = min(
                    shortestManhattan,
                    getDistance(node.boundingBox.minX, 0) +
                        getDistance(node.boundingBox.minY, 0) +
                        getDistance(node.boundingBox.minZ, 0),
                );
            }
            continue;
        }

        if (
            node.boundingBox.maxX - node.boundingBox.minX <= minRange &&
            node.boundingBox.maxY - node.boundingBox.minY <= minRange &&
            node.boundingBox.maxZ - node.boundingBox.minZ <= minRange &&
            node.count < maxBots
        ) {
            continue;
        }

        node.split();
        for (let child of node.children) {
            child.count = 0;
            child.level = node.level + 1;
            let boxMinCorner = {
                x: child.boundingBox.minX,
                y: child.boundingBox.minY,
                z: child.boundingBox.minZ,
            };
            let boxMaxCorner = {
                x: child.boundingBox.maxX,
                y: child.boundingBox.maxY,
                z: child.boundingBox.maxZ,
            };

            for (let bot of nanobots) {
                if (getShortestDistance(bot, boxMinCorner, boxMaxCorner) <= bot.range) {
                    child.count++;
                }
            }

            if (maxBots === 0 || child.count >= maxBots) {
                queue.insert(child);
            }
        }
    }
    const answer = shortestManhattan;
    return { value: answer };
}
