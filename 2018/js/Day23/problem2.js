module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const { abs, min, max } = Math;
    const OctreeNode = require('../../../tools/octree.js');

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
    root.split();
    let queue = [...root.children];

    while (queue.length > 0) {
        let node = queue.shift();
        // if node contains less bots than max, skip
        // if node contains only one coordinate, save max bots and skip
        let midX = (node.boundingBox.minX + node.boundingBox.maxX) / 2;
        let midY = (node.boundingBox.minY + node.boundingBox.maxY) / 2;
        let midZ = (node.boundingBox.minZ + node.boundingBox.maxZ) / 2;
        node.split();
        for (let bot of nanobots) {
            // check if bot overlaps with node
            // increment count if it does
        }

        // take node with highest number of bots and split
        // add new children to queue and sort by number of bots
    }
    
    const answer = 0;
    return { value: answer };
}
