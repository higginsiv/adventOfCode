module.exports = {solve: solve};

function solve({lines, rawData}) {
    const MIN = -50;
    const MAX = 50;
    const ON = 1;

    const instructions = parseData(lines);
    let on = new Set();
    instructions.forEach(instruction => {
        const [move, x1, x2, y1, y2, z1, z2] = instruction;
        if (move === ON) {
            for (let x = MIN; x <= MAX; x++) {
                // if (!isBetween(x1, x2, x)) continue;
                for (let y = MIN; y <= MAX; y++) {
                    // if (!isBetween(y1, y2, y)) continue;
                    for (let z = MIN; z <= MAX; z++) {
                        // if (!isBetween(z1, z2, z)) continue;
                        on.add(`${x},${y},${z}`);
                    }
                }
            }
        } else {
            for (let x = MIN; x <= MAX; x++) {
                // if (!isBetween(x1, x2, x)) continue;
                for (let y = MIN; y <= MAX; y++) {
                    // if (!isBetween(y1, y2, y)) continue;
                    for (let z = MIN; z <= MAX; z++) {
                        // if (!isBetween(z1, z2, z)) continue;
                        on.delete(`${x},${y},${z}`);
                    }
                }
            }
        }
    });

    const answer = on.size;
    return {value: answer};
}

function parseData(lines) {
    return lines.map(line => {
        line = line.replace('on', '1');
        line = line.replace('off', '0');
        line = line.match(/-?\d+/g).map(Number);
        return line;
    });
}
