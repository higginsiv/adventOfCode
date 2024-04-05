module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const [NORTH, EAST, SOUTH, WEST] = ['^', '>', 'v', '<'];

    let curX = 0;
    let curY = 0;
    let locations = new Map();
    locations.set(makeKey(curX, curY), 1);

    rawData.split('').forEach((x) => {
        switch (x) {
            case NORTH:
                curY++;
                break;
            case EAST:
                curX++;
                break;
            case SOUTH:
                curY--;
                break;
            case WEST:
                curX--;
                break;
            default:
                console.log('f');
        }

        let key = makeKey(curX, curY);
        let presentCount = locations.get(key);
        presentCount = presentCount == null ? 1 : presentCount + 1;
        locations.set(key, presentCount);
    });

    const answer = locations.size;
    return { value: answer };
}

function makeKey(x, y) {
    return x + '.' + y;
}
