module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const MIN = -50;
    const MAX = 50;

    const instructions = parseData(lines);
    let grid = new Array(101)
        .fill(0)
        .map(() => new Array(101).fill(0).map(() => new Array(101).fill(0)));

    instructions.forEach((instruction) => {
        const [move, x1, x2, y1, y2, z1, z2] = instruction;

        for (let x = MIN; x <= MAX; x++) {
            if (!isBetween(x1, x2, x)) continue;
            for (let y = MIN; y <= MAX; y++) {
                if (!isBetween(y1, y2, y)) continue;
                for (let z = MIN; z <= MAX; z++) {
                    if (!isBetween(z1, z2, z)) continue;
                    grid[x + 50][y + 50][z + 50] = move;
                }
            }
        }
    });

    const answer = grid.flat(2).filter((x) => x === 1).length;
    return { value: answer };
}

function parseData(lines) {
    return lines.map((line) => {
        line = line.replace('on', '1');
        line = line.replace('off', '0');
        line = line.match(/-?\d+/g).map(Number);
        return line;
    });
}

function isBetween(boundary1, boundary2, value) {
    return (value >= boundary1 && value <= boundary2) || (value >= boundary2 && value <= boundary1);
}
