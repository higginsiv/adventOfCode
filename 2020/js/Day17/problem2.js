export default function solve({ lines, rawData }) {
    const [INACTIVE, ACTIVE] = ['.', '#'];
    const DELIM = '.';
    const Z_START = 0;
    const A_START = 0;

    const ROUNDS = 6;

    let cube = new Map();
    lines.forEach((x, row) => {
        x = x.split('');
        x.forEach((val, col) => {
            cube.set(generateKey(col, row, Z_START, A_START), val);
            getNeighborKeys(col, row, Z_START, A_START).forEach((key) => {
                if (cube.get(key) == null) {
                    cube.set(key, INACTIVE);
                }
            });
        });
    });

    for (let i = 0; i < ROUNDS; i++) {
        let next = new Map();
        cube.forEach((val, key) => {
            let [x, y, z, a] = key.split(DELIM).map((n) => parseInt(n));
            let neighbors = getNeighborKeys(x, y, z, a);
            let activeNeighbors = neighbors.filter((k) => cube.get(k) === ACTIVE);

            if (val === ACTIVE && activeNeighbors.length !== 2 && activeNeighbors.length !== 3) {
                next.set(generateKey(x, y, z, a), INACTIVE);
            } else if (val === INACTIVE && activeNeighbors.length === 3) {
                next.set(generateKey(x, y, z, a), ACTIVE);
            } else {
                next.set(generateKey(x, y, z, a), val);
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

    function generateKey(x, y, z, a) {
        return x + DELIM + y + DELIM + z + DELIM + a;
    }

    function getNeighborKeys(x, y, z, a) {
        let neighborKeys = [];

        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                for (let k = z - 1; k <= z + 1; k++) {
                    for (let l = a - 1; l <= a + 1; l++) {
                        if (!(i === x && j === y && k === z && l === a)) {
                            neighborKeys.push(generateKey(i, j, k, l));
                        }
                    }
                }
            }
        }

        return neighborKeys;
    }

    return { value: answer };
}
