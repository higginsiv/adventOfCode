module.exports = { solve: solve };

function solve({ lines, rawData }) {
    function move(x, y, direction) {
        switch (direction) {
            case NORTH:
                return [x - 1, y];
            case EAST:
                return [x, y + 1];
            case SOUTH:
                return [x + 1, y];
            case WEST:
                return [x, y - 1];
        }
    }

    const [NORTH, EAST, SOUTH, WEST] = [0, 1, 2, 3];
    let longest = lines.reduce((longest, line) => {
        return longest > line.length ? longest : line.length;
    }, 0);

    let grid = lines.map((line) => line.split('').concat(Array(longest - line.length + 1)));

    let x = 0;
    let y = grid[0].indexOf('|');
    let direction = SOUTH;
    let message = '';

    while (true) {
        let [nextX, nextY] = move(x, y, direction);
        let next = grid[nextX][nextY];

        if (next === '+') {
            if (direction === NORTH || direction === SOUTH) {
                if (grid[nextX][nextY - 1] === '-') {
                    direction = WEST;
                } else {
                    direction = EAST;
                }
            } else {
                if (grid[nextX - 1][nextY] === '|') {
                    direction = NORTH;
                } else {
                    direction = SOUTH;
                }
            }
        } else if (next === ' ') {
            break;
        } else if (next.match(/[A-Z]/)) {
            message += next;
        }

        x = nextX;
        y = nextY;
    }

    return { value: message };
}
