module.exports = { solve: solve };

function solve({ lines, rawData }) {
    function getKey(x, y) {
        return `${x},${y}`;
    }

    function getNeighbors(x, y) {
        return [
            [x - 1, y - 1],
            [x, y - 1],
            [x + 1, y - 1],
            [x - 1, y],
            [x + 1, y],
            [x - 1, y + 1],
            [x, y + 1],
            [x + 1, y + 1],
        ]
            .map(([x, y]) => getKey(x, y))
            .filter((key) => results.has(key));
    }

    function getValue(x, y) {
        let currentValue = 0;
        let neighbors = getNeighbors(x, y);

        for (let neighbor of neighbors) {
            currentValue += results.get(neighbor) || 0;
        }
        results.set(getKey(x, y), currentValue);

        return currentValue;
    }

    let minX = 0;
    let maxX = 0;
    let minY = 0;
    let maxY = 0;

    let x = 0;
    let y = 0;

    let results = new Map([[getKey(0, 0), 1]]);
    let currentValue = 0;
    const goal = parseInt(rawData);

    outer: while (true) {
        currentValue = 0;

        while (x <= maxX) {
            x++;
            currentValue = getValue(x, y);
            if (currentValue > goal) {
                break outer;
            }
        }
        maxX++;

        while (y <= maxY) {
            y++;
            currentValue = getValue(x, y);

            if (currentValue > goal) {
                break outer;
            }
        }
        maxY++;

        while (x >= minX) {
            x--;
            currentValue = getValue(x, y);
            if (currentValue > goal) {
                break outer;
            }
        }
        minX--;

        while (y >= minY) {
            y--;
            currentValue = getValue(x, y);
            if (currentValue > goal) {
                break outer;
            }
        }
        minY--;
    }

    let answer = currentValue;
    return { value: answer };
}
