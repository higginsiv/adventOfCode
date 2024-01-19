module.exports = { solve: solve };

function solve({ lines, rawData }) {
    lines.splice(0, 2);

    // x == 32, y == 29
    let maxX = 0;
    let maxY = 0;
    lines = lines.map((line) => {
        let matches = line.match(/\d+/g);
        let x = parseInt(matches[0]);
        let y = parseInt(matches[1]);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
        return {
            x: x,
            y: y,
            used: parseInt(matches[3]),
            avail: parseInt(matches[4]),
        };
    });

    let grid = Array.from(Array(maxY + 1), () => new Array(maxX + 1).fill(0));

    lines.forEach((node) => {
        grid[node.y][node.x] = node;
    });

    let goalUsed = grid[0][maxX].used;
    console.log(goalUsed)
    lines.forEach((node) => {
        if (node.avail > goalUsed) {
            grid[node.y][node.x] = '#';
        } else {
            grid[node.y][node.x] = '.';
        }
    });

    console.log(maxX, maxY);
    return { value: [grid, ['#']], strategy: 'grid' };
}
