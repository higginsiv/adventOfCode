module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const { abs, min, max, floor } = Math;
    const PriorityQueue = require('../../../tools/queue.js');
    const OctreeNode = require('../../../tools/octree.js');

    function getKey(x, y, z) {
        return `${x},${y},${z}`;
    }

    function getDistance(p1, p2) {
        return abs(p1 - p2);
    }

    function compare(a, b) {
        return b.count - a.count;
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

    console.log({ minX, minY, minZ, maxX, maxY, maxZ });
    console.log({ x: maxX - minX, y: maxY - minY, z: maxZ - minZ });
    let root = new OctreeNode(minX, minY, minZ, maxX, maxY, maxZ);
    root.count = 0;

    let queue = new PriorityQueue([root], compare);
    let maxBots = 0;
    let shortestManhattan = Infinity;
    let bestCoord;

    let i = 0;
    while (queue.isNotEmpty()) {
        // i++;
        // if (i > 50000) {
        //     break;
        // }
        let node = queue.next();
        // console.log(node, maxBots)

        if (node.boundingBox.minX === node.boundingBox.maxX && node.boundingBox.minY === node.boundingBox.maxY && node.boundingBox.minZ === node.boundingBox.maxZ) {
            maxBots = max(maxBots, node.count);
            if (node.count === maxBots) {
                shortestManhattan = min(shortestManhattan, getDistance(node.boundingBox.minX, 0) + getDistance(node.boundingBox.minY, 0) + getDistance(node.boundingBox.minZ, 0));
                bestCoord = { x: node.boundingBox.minX, y: node.boundingBox.minY, z: node.boundingBox.minZ };
            }
            continue;
        }

        if (node.boundingBox.maxX - node.boundingBox.minX <= minRange && node.boundingBox.maxY - node.boundingBox.minY <= minRange && node.boundingBox.maxZ - node.boundingBox.minZ <= minRange && node.count < maxBots) {
            continue;
        }

        node.split();
        for (let child of node.children) {
            let midX = floor((child.boundingBox.minX + child.boundingBox.maxX) / 2);
            let midY = floor((child.boundingBox.minY + child.boundingBox.maxY) / 2);
            let midZ = floor((child.boundingBox.minZ + child.boundingBox.maxZ) / 2);
            child.count = 0;
            for (let bot of nanobots) {
                if (getDistance(bot.x, midX) + getDistance(bot.y, midY) + getDistance(bot.z, midZ) <= bot.range) {
                    child.count++;
                }
            }

            if ((child.boundingBox.maxX - child.boundingBox.minX > minRange || child.boundingBox.maxY - child.boundingBox.minY > minRange || child.boundingBox.maxZ - child.boundingBox.minZ > minRange) || child.count >= maxBots) {
                queue.insert(child);
            }
            
        }
    }
    console.log(i, maxBots, shortestManhattan, bestCoord)
    const answer = shortestManhattan;
    return { value: answer };
}
