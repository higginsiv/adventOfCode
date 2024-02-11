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

    let answer;
    outer: while (true) {
        carts.sort((a, b) => a.x - b.x || a.y - b.y);

        for (let i = 0; i < carts.length; i++) {
            const cart = carts[i];
            const nextX =
                cart.x + (cart.direction === SOUTH ? 1 : cart.direction === NORTH ? -1 : 0);
            const nextY = cart.y + (cart.direction === EAST ? 1 : cart.direction === WEST ? -1 : 0);
            const nextCell = grid[nextX][nextY];

            if (carts.some((c) => c.x === nextX && c.y === nextY)) {
                answer = `${nextY},${nextX}`;
                break outer;
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
    }

    return { value: answer };
}
