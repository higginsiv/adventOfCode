module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const [INACTIVE, ACTIVE] = ['.', '#'];
    const DELIM = '.';
    const Z_START = 0;
    const ROUNDS = 6;

    let cube = new Map();
    lines.forEach((x, row) => {
        x = x.split('');
        x.forEach((val, col) => {
            cube.set(generateKey(col, row, Z_START), val);
            getNeighborKeys(col, row, Z_START).forEach((key) => {
                if (cube.get(key) == null) {
                    cube.set(key, INACTIVE);
                }
            });
        });
    });

    for (let i = 0; i < ROUNDS; i++) {
        let next = new Map();
        cube.forEach((val, key) => {
            let [x, y, z] = key.split(DELIM).map((n) => parseInt(n));
            let neighbors = getNeighborKeys(x, y, z);
            let activeNeighbors = neighbors.filter((k) => cube.get(k) === ACTIVE);

            if (val === ACTIVE && activeNeighbors.length !== 2 && activeNeighbors.length !== 3) {
                next.set(generateKey(x, y, z), INACTIVE);
            } else if (val === INACTIVE && activeNeighbors.length === 3) {
                next.set(generateKey(x, y, z), ACTIVE);
            } else {
                next.set(generateKey(x, y, z), val);
            }

            neighbors.forEach((key) => {
                if (next.get(key) == null) {
                    next.set(key, INACTIVE);
                }
            });
        });
        cube = next;
    }

    const answer = Array.from(cube.keys()).filter((key) => cube.get(key) === ACTIVE).length;

    function generateKey(x, y, z) {
        return x + DELIM + y + DELIM + z;
    }

    function getNeighborKeys(x, y, z) {
        let neighborKeys = [];

        // TODO change this to use generateKey
        neighborKeys.push(x + 1 + DELIM + y + DELIM + z);
        neighborKeys.push(x + 1 + DELIM + (y + 1) + DELIM + z);
        neighborKeys.push(x + 1 + DELIM + (y + 1) + DELIM + (z + 1));
        neighborKeys.push(x + 1 + DELIM + (y - 1) + DELIM + z);
        neighborKeys.push(x + 1 + DELIM + (y - 1) + DELIM + (z - 1));
        neighborKeys.push(x + 1 + DELIM + y + DELIM + (z + 1));
        neighborKeys.push(x + 1 + DELIM + y + DELIM + (z - 1));
        neighborKeys.push(x + 1 + DELIM + (y + 1) + DELIM + (z - 1));
        neighborKeys.push(x + 1 + DELIM + (y - 1) + DELIM + (z + 1));

        neighborKeys.push(x - 1 + DELIM + y + DELIM + z);
        neighborKeys.push(x - 1 + DELIM + (y + 1) + DELIM + z);
        neighborKeys.push(x - 1 + DELIM + (y + 1) + DELIM + (z + 1));
        neighborKeys.push(x - 1 + DELIM + (y - 1) + DELIM + z);
        neighborKeys.push(x - 1 + DELIM + (y - 1) + DELIM + (z - 1));
        neighborKeys.push(x - 1 + DELIM + y + DELIM + (z + 1));
        neighborKeys.push(x - 1 + DELIM + y + DELIM + (z - 1));
        neighborKeys.push(x - 1 + DELIM + (y + 1) + DELIM + (z - 1));
        neighborKeys.push(x - 1 + DELIM + (y - 1) + DELIM + (z + 1));

        neighborKeys.push(x + DELIM + (y + 1) + DELIM + z);
        neighborKeys.push(x + DELIM + (y + 1) + DELIM + (z + 1));
        neighborKeys.push(x + DELIM + (y - 1) + DELIM + z);
        neighborKeys.push(x + DELIM + (y - 1) + DELIM + (z - 1));
        neighborKeys.push(x + DELIM + y + DELIM + (z + 1));
        neighborKeys.push(x + DELIM + y + DELIM + (z - 1));
        neighborKeys.push(x + DELIM + (y + 1) + DELIM + (z - 1));
        neighborKeys.push(x + DELIM + (y - 1) + DELIM + (z + 1));

        return neighborKeys;
    }

    return { value: answer };
}
