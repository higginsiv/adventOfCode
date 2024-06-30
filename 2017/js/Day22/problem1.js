export default function solve({ lines, rawData }) {
    const { floor } = Math;
    const [NORTH, EAST, SOUTH, WEST] = [0, 1, 2, 3];

    function getKey(x, y) {
        return `${x},${y}`;
    }

    function turnRight(dir) {
        return (dir + 1) % 4;
    }

    function turnLeft(dir) {
        return (dir + 3) % 4;
    }

    let infected = new Set();

    lines
        .map((line) => line.split(''))
        .forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell === '#') {
                    infected.add(getKey(x, y));
                }
            });
        });

    let x = floor(lines[0].length / 2);
    let y = floor(lines.length / 2);
    let direction = NORTH;
    const iterations = 10000;
    let infectiousBursts = 0;

    for (let i = 0; i < iterations; i++) {
        const key = getKey(x, y);
        if (infected.has(key)) {
            direction = turnRight(direction);
            infected.delete(key);
        } else {
            direction = turnLeft(direction);
            infected.add(key);
            infectiousBursts++;
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
