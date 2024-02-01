module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const { floor } = Math;
    const [NORTH, EAST, SOUTH, WEST] = [0, 1, 2, 3];
    const [CLEAN, WEAKENED, INFECTED, FLAGGED] = [0, 1, 2, 3];

    function getKey(x, y) {
        return `${x},${y}`;
    }

    function turnRight(dir) {
        return (dir + 1) % 4;
    }

    function turnLeft(dir) {
        return (dir + 3) % 4;
    }

    let status = new Map();

    lines
        .map((line) => line.split(''))
        .forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell === '#') {
                    status.set(getKey(x, y), INFECTED);
                }
            });
        });

    let x = floor(lines[0].length / 2);
    let y = floor(lines.length / 2);
    let direction = NORTH;
    const iterations = 10000000;
    let infectiousBursts = 0;

    for (let i = 0; i < iterations; i++) {
        const key = getKey(x, y);
        let currentStatus = status.get(key) || CLEAN;
        switch (currentStatus) {
            case CLEAN:
                direction = turnLeft(direction);
                status.set(key, WEAKENED);
                break;
            case WEAKENED:
                status.set(key, INFECTED);
                infectiousBursts++;
                break;
            case INFECTED:
                direction = turnRight(direction);
                status.set(key, FLAGGED);
                break;
            case FLAGGED:
                direction = turnRight(turnRight(direction));
                status.set(key, CLEAN);
                break;
        }

        switch (direction) {
            case NORTH:
                y--;
                break;
            case EAST:
                x++;
                break;
            case SOUTH:
                y++;
                break;
            case WEST:
                x--;
                break;
        }
    }
    const answer = infectiousBursts;
    return { value: answer };
}
