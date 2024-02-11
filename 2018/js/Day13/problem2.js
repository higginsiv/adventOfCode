module.exports = { solve: solve };

function solve({ lines, rawData }) {
    function getNextTurn(turn) {
        return turn === LEFT ? STRAIGHT : turn === STRAIGHT ? RIGHT : LEFT;
    }

    function rotateCart(currentDirection, nextTurn) {
        const index = DIRECTIONS.indexOf(currentDirection);
        const nextIndex = (index + nextTurn + DIRECTIONS.length) % DIRECTIONS.length;
        return DIRECTIONS[nextIndex];
    }

    const [NORTH, EAST, SOUTH, WEST] = ['^', '>', 'v', '<'];
    const DIRECTIONS = [NORTH, EAST, SOUTH, WEST];
    const [LEFT, STRAIGHT, RIGHT] = [-1, 0, 1];

    let grid = lines.map((line) => line.split(''));
    let carts = [];

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (DIRECTIONS.includes(grid[i][j])) {
                const cart = {
                    x: i,
                    y: j,
                    direction: grid[i][j],
                    nextTurn: LEFT,
                };
                carts.push(cart);
            }
        }
    }

    while (carts.length > 1) {
        carts.sort((a, b) => a.x - b.x || a.y - b.y);

        for (let i = 0; i < carts.length; i++) {
            const cart = carts[i];
            if (cart.deleted) {
                continue;
            }

            const nextX =
                cart.x + (cart.direction === SOUTH ? 1 : cart.direction === NORTH ? -1 : 0);
            const nextY = cart.y + (cart.direction === EAST ? 1 : cart.direction === WEST ? -1 : 0);
            const nextCell = grid[nextX][nextY];

            let collision = false;
            carts.forEach((c) => {
                if (c.x === nextX && c.y === nextY) {
                    collision = true;
                    c.deleted = true;
                    cart.deleted = true;
                }
            });

            if (collision) {
                continue;
            }

            if (nextCell === '/') {
                cart.direction =
                    cart.direction === NORTH
                        ? EAST
                        : cart.direction === EAST
                          ? NORTH
                          : cart.direction === SOUTH
                            ? WEST
                            : SOUTH;
            } else if (nextCell === '\\') {
                cart.direction =
                    cart.direction === NORTH
                        ? WEST
                        : cart.direction === WEST
                          ? NORTH
                          : cart.direction === SOUTH
                            ? EAST
                            : SOUTH;
            } else if (nextCell === '+') {
                cart.direction = rotateCart(cart.direction, cart.nextTurn);
                cart.nextTurn = getNextTurn(cart.nextTurn);
            }

            cart.x = nextX;
            cart.y = nextY;
        }
        carts = carts.filter((cart) => !cart.deleted);
    }

    const answer = `${carts[0].y},${carts[0].x}`;
    return { value: answer };
}
