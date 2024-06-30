export default function solve({ lines, rawData }) {
    const [EAST, WEST, NORTHWEST, NORTHEAST, SOUTHWEST, SOUTHEAST] = [
        'e',
        'w',
        'nw',
        'ne',
        'sw',
        'se',
    ];
    const ALL = [EAST, WEST, NORTHWEST, NORTHEAST, SOUTHWEST, SOUTHEAST];
    const [REF_X, REF_Y] = [0, 0];
    const NUM_DAYS = 100;
    const KEY_DELIM = '|';

    let blackTiles = new Set();

    lines.forEach((line) => {
        let [x, y] = [REF_X, REF_Y];
        line = line.split('');

        while (line.length > 0) {
            let step = line.shift();
            if (!ALL.includes(step)) {
                step += line.shift();
            }

            switch (step) {
                case EAST:
                    x += 2;
                    break;
                case WEST:
                    x -= 2;
                    break;
                case NORTHEAST:
                    x++;
                    y++;
                    break;
                case NORTHWEST:
                    x--;
                    y++;
                    break;
                case SOUTHEAST:
                    x++;
                    y--;
                    break;
                case SOUTHWEST:
                    x--;
                    y--;
            }
        }

        let key = generateKey(x, y);
        if (blackTiles.has(key)) {
            blackTiles.delete(key);
        } else {
            blackTiles.add(key);
        }
    });

    for (let i = 0; i < NUM_DAYS; i++) {
        let keyToBlackNeighbors = new Map();
        let newBlackTiles = new Set();

        blackTiles.forEach((tile) => {
            let [x, y] = getTileFromKey(tile);

            let east = generateKey(x + 2, y);
            let west = generateKey(x - 2, y);
            let northEast = generateKey(x + 1, y + 1);
            let northWest = generateKey(x - 1, y + 1);
            let southEast = generateKey(x + 1, y - 1);
            let southWest = generateKey(x - 1, y - 1);

            let neighbors = [east, west, northEast, northWest, southEast, southWest];

            let blackNeighbors = 0;
            neighbors.forEach((key) => {
                if (blackTiles.has(key)) {
                    blackNeighbors++;
                } else {
                    let currBlackNeighbors = keyToBlackNeighbors.get(key);
                    if (currBlackNeighbors == null) {
                        currBlackNeighbors = 0;
                    }
                    keyToBlackNeighbors.set(key, ++currBlackNeighbors);
                }
            });

            if (!(blackNeighbors === 0 || blackNeighbors > 2)) {
                newBlackTiles.add(tile);
            }
        });

        keyToBlackNeighbors.forEach((value, key) => {
            if (value === 2) {
                newBlackTiles.add(key);
            }
        });

        blackTiles = newBlackTiles;
    }

    function generateKey(x, y) {
        return x + KEY_DELIM + y;
    }

    function getTileFromKey(key) {
        return key.split(KEY_DELIM).map((x) => parseInt(x));
    }

    const answer = blackTiles.size;
    return { value: answer };
}
