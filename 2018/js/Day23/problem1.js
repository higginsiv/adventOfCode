module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const { abs } = Math;
    function getDistance(p1, p2) {
        return abs(p1 - p2);
    }

    const nanobots = lines
        .map((line) => {
            let [x, y, z, range] = line.match(/-?\d+/g).map(Number);
            return { x, y, z, range };
        })
        .sort((a, b) => a.range - b.range);

    let { x, y, z, range } = nanobots.pop();
    const answer = nanobots.reduce((acc, bot) => {
        const distance = getDistance(x, bot.x) + getDistance(y, bot.y) + getDistance(z, bot.z);
        return acc + (distance <= range ? 1 : 0);
    }, 1);

    return { value: answer };
}
