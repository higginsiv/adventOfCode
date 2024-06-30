export default function solve({ lines, rawData }) {
    let DATA = lines.map((x) => x.split(''));
    const START = 'S';
    const FLOOD = '*';

    const [NORTH_SOUTH, EAST_WEST, NORTH_EAST, NORTH_WEST, SOUTH_WEST, SOUTH_EAST, GROUND] = [
        '|',
        '-',
        'L',
        'J',
        '7',
        'F',
        '.',
    ];
    const PIPES = [NORTH_SOUTH, EAST_WEST, NORTH_EAST, NORTH_WEST, SOUTH_WEST, SOUTH_EAST];

    class State {
        x;
        y;
        pipe;
        visited;
        startPipe;
        constructor(x, y, pipe, visited, startPipe) {
            this.x = x;
            this.y = y;
            this.pipe = pipe;
            this.visited = visited;
            this.startPipe = startPipe;
        }
    }

    // START COPIED FROM PART 1

    // Create a new row filled with '.' characters
    let newRow = new Array(DATA[0].length + 2).fill('.');

    // Create a new 2D array with the new rows at the start and end
    let newData = [newRow];

    // Add the existing rows, with '.' characters at the start and end
    for (let row of DATA) {
        newData.push(['.'].concat(row, ['.']));
    }

    // Add the last new row
    newData.push(newRow);

    // Replace the old DATA array with the new one
    DATA = newData;

    let startX;
    let startY;

    let queue = [];

    for (let i = 0; i < DATA.length; i++) {
        let row = DATA[i];
        if (row.includes(START)) {
            startX = i;
            startY = row.indexOf(START);
            PIPES.forEach((pipe) => {
                queue.push(
                    new State(
                        i,
                        row.indexOf(START),
                        pipe,
                        [getLocationKey(i, row.indexOf(START))],
                        pipe,
                    ),
                );
            });
            break;
        }
    }

    let loop;
    let startTile;
    while (queue.length > 0) {
        let state = queue.shift();

        if (state.x === startX && state.y === startY && state.visited.length > 1) {
            loop = state.visited;
            startTile = state.startPipe;
            break;
        }

        let coordsToLookAt = [];
        let northNeighbor = DATA[state.x - 1][state.y];
        let eastNeighbor = DATA[state.x][state.y + 1];
        let southNeighbor = DATA[state.x + 1][state.y];
        let westNeighbor = DATA[state.x][state.y - 1];

        switch (state.pipe) {
            case NORTH_SOUTH:
                if (
                    [NORTH_SOUTH, SOUTH_EAST, SOUTH_WEST].includes(northNeighbor) ||
                    ([NORTH_SOUTH, SOUTH_EAST, SOUTH_WEST].includes(state.startPipe) &&
                        northNeighbor === START)
                ) {
                    coordsToLookAt.push(getLocationKey(state.x - 1, state.y));
                }
                if (
                    [NORTH_SOUTH, NORTH_EAST, NORTH_WEST].includes(southNeighbor) ||
                    ([NORTH_SOUTH, NORTH_EAST, NORTH_WEST].includes(state.startPipe) &&
                        southNeighbor === START)
                ) {
                    coordsToLookAt.push(getLocationKey(state.x + 1, state.y));
                }
                break;
            case EAST_WEST:
                if (
                    [EAST_WEST, NORTH_WEST, SOUTH_WEST].includes(eastNeighbor) ||
                    ([EAST_WEST, NORTH_WEST, SOUTH_WEST].includes(state.startPipe) &&
                        eastNeighbor === START)
                ) {
                    coordsToLookAt.push(getLocationKey(state.x, state.y + 1));
                }
                if (
                    [EAST_WEST, NORTH_EAST, SOUTH_EAST].includes(westNeighbor) ||
                    ([EAST_WEST, NORTH_EAST, SOUTH_EAST].includes(state.startPipe) &&
                        westNeighbor === START)
                ) {
                    coordsToLookAt.push(getLocationKey(state.x, state.y - 1));
                }
                break;
            case NORTH_EAST:
                if (
                    [NORTH_SOUTH, SOUTH_EAST, SOUTH_WEST].includes(northNeighbor) ||
                    ([NORTH_SOUTH, SOUTH_EAST, SOUTH_WEST].includes(state.startPipe) &&
                        northNeighbor === START)
                ) {
                    coordsToLookAt.push(getLocationKey(state.x - 1, state.y));
                }
                if (
                    [EAST_WEST, NORTH_WEST, SOUTH_WEST].includes(eastNeighbor) ||
                    ([EAST_WEST, NORTH_WEST, SOUTH_WEST].includes(state.startPipe) &&
                        eastNeighbor === START)
                ) {
                    coordsToLookAt.push(getLocationKey(state.x, state.y + 1));
                }
                break;
            case NORTH_WEST:
                if (
                    [NORTH_SOUTH, SOUTH_EAST, SOUTH_WEST].includes(northNeighbor) ||
                    ([NORTH_SOUTH, SOUTH_EAST, SOUTH_WEST].includes(state.startPipe) &&
                        northNeighbor === START)
                ) {
                    coordsToLookAt.push(getLocationKey(state.x - 1, state.y));
                }
                if (
                    [EAST_WEST, NORTH_EAST, SOUTH_EAST].includes(westNeighbor) ||
                    ([EAST_WEST, NORTH_EAST, SOUTH_EAST].includes(state.startPipe) &&
                        westNeighbor === START)
                ) {
                    coordsToLookAt.push(getLocationKey(state.x, state.y - 1));
                }
                break;
            case SOUTH_WEST:
                if (
                    [NORTH_SOUTH, NORTH_EAST, NORTH_WEST].includes(southNeighbor) ||
                    ([NORTH_SOUTH, NORTH_EAST, NORTH_WEST].includes(state.startPipe) &&
                        southNeighbor === START)
                ) {
                    coordsToLookAt.push(getLocationKey(state.x + 1, state.y));
                }
                if (
                    [EAST_WEST, NORTH_EAST, SOUTH_EAST].includes(westNeighbor) ||
                    ([EAST_WEST, NORTH_EAST, SOUTH_EAST].includes(state.startPipe) &&
                        westNeighbor === START)
                ) {
                    coordsToLookAt.push(getLocationKey(state.x, state.y - 1));
                }
                break;
            case SOUTH_EAST:
                if (
                    [NORTH_SOUTH, NORTH_EAST, NORTH_WEST].includes(southNeighbor) ||
                    ([NORTH_SOUTH, NORTH_EAST, NORTH_WEST].includes(state.startPipe) &&
                        southNeighbor === START)
                ) {
                    coordsToLookAt.push(getLocationKey(state.x + 1, state.y));
                }
                if (
                    [EAST_WEST, NORTH_WEST, SOUTH_WEST].includes(eastNeighbor) ||
                    ([EAST_WEST, NORTH_WEST, SOUTH_WEST].includes(state.startPipe) &&
                        eastNeighbor === START)
                ) {
                    coordsToLookAt.push(getLocationKey(state.x, state.y + 1));
                }
                break;
            case GROUND:
                break;
        }

        coordsToLookAt.forEach((coords) => {
            let [x, y] = coords.split('|').map((x) => parseInt(x));

            if (
                !state.visited.includes(coords) ||
                (coords === getLocationKey(startX, startY) && state.visited.length > 2)
            ) {
                let pipe = DATA[x][y];
                let visited = state.visited.slice();
                visited.push(coords);
                queue.push(new State(x, y, pipe, visited, state.startPipe));
            }
        });
    }

    // END COPIED FROM PART 1

    // Make a new grid that is 3 times the size of the old one
    // I was getting out of bounds errors as I expanded the loop and this is a lazy way to prevent that
    let newGrid = DATA;
    let symbol = '.';

    let newArray = Array.from({ length: newGrid.length * 3 }, () =>
        Array(newGrid[0].length * 3).fill(symbol),
    );

    newGrid = newArray;

    // Get the offset of the original coordinates so that my new loop doesn't start at 0,0
    let offsetX = DATA.length;
    let offsetY = DATA[0].length;

    let x = startX + offsetX;
    let y = startY + offsetY;

    // "Bad" columns and rows are those that are created from expanding the loop. Any non-filled
    // space in a bad column or row will not count towards the answer
    let badColumns = new Set();
    let badRows = new Set();

    // Lazy way to deal with the fact my loop starts and ends with the start pipe
    loop.pop();

    // Extend each pipe. For example a | is replaced by 3 |s oriented in the same direction.
    // A F is replaced by an F with a | to the south and a - to the east, etc
    // This allows me to use flood fill between pipes much easier as now something like || will become |.|
    loop.forEach((coords, index) => {
        let [origX, origY] = coords.split('|').map((x) => parseInt(x));

        if (index !== 0) {
            x += 2 * (origX - parseInt(loop[index - 1].split('|')[0]));
            y += 2 * (origY - parseInt(loop[index - 1].split('|')[1]));
        }

        let pipe = DATA[origX][origY];

        if (pipe === START) {
            pipe = startTile;
        }

        newGrid[x][y] = pipe;

        if (pipe === NORTH_SOUTH) {
            badRows.add(x - 1);
            badRows.add(x + 1);
            newGrid[x - 1][y] = pipe;
            newGrid[x + 1][y] = pipe;
        } else if (pipe === EAST_WEST) {
            badColumns.add(y - 1);
            badColumns.add(y + 1);
            newGrid[x][y - 1] = pipe;
            newGrid[x][y + 1] = pipe;
        } else if (pipe === NORTH_EAST) {
            badColumns.add(y + 1);
            badRows.add(x - 1);
            newGrid[x - 1][y] = NORTH_SOUTH;
            newGrid[x][y + 1] = EAST_WEST;
        } else if (pipe === NORTH_WEST) {
            badColumns.add(y - 1);
            badRows.add(x - 1);
            newGrid[x - 1][y] = NORTH_SOUTH;
            newGrid[x][y - 1] = EAST_WEST;
        } else if (pipe === SOUTH_WEST) {
            badColumns.add(y - 1);
            badRows.add(x + 1);
            newGrid[x + 1][y] = NORTH_SOUTH;
            newGrid[x][y - 1] = EAST_WEST;
        } else if (pipe === SOUTH_EAST) {
            badColumns.add(y + 1);
            badRows.add(x + 1);
            newGrid[x + 1][y] = NORTH_SOUTH;
            newGrid[x][y + 1] = EAST_WEST;
        }
    });

    // Add a new row so that I can have a spot for certain that is outside of the loop
    newGrid.push(new Array(newGrid[0].length).fill('.'));
    let floodX = newGrid.length - 1;
    let floodY = newGrid[0].length - 1;

    let visited = new Set();

    floodFill(floodX, floodY);

    // Sum all remaining ground tiles that are not in bad rows or columns. Note that all non-loop pipe tiles
    // were removed when we mapped the loop onto the larger grid
    let answer = 0;
    for (let i = 0; i < newGrid.length; i++) {
        let row = newGrid[i];
        for (let j = 0; j < row.length; j++) {
            if (row[j] === GROUND && !badRows.has(i) && !badColumns.has(j)) {
                answer++;
            }
        }
    }

    function floodFill(startX, startY) {
        let queue = [[startX, startY]];

        while (queue.length > 0) {
            let [x, y] = queue.shift();

            if (x < 0 || y < 0 || x >= newGrid.length || y >= newGrid[0].length) {
                continue;
            }

            let locationKey = getLocationKey(x, y);
            if (PIPES.includes(newGrid[x][y]) || visited.has(locationKey)) {
                continue;
            }

            visited.add(locationKey);
            newGrid[x][y] = FLOOD;

            queue.push([x - 1, y]);
            queue.push([x + 1, y]);
            queue.push([x, y - 1]);
            queue.push([x, y + 1]);
        }
    }

    // Utility function to get a unique key for a location. Can probably refactor this to not constantly convert
    // back and forth between string and int
    function getLocationKey(x, y) {
        return `${x}|${y}`;
    }

    // Prints grid for debugging only
    function printGrid(grid) {
        for (let row of grid) {
            console.log(row.join(''));
        }
        console.log('-------------------');
    }

    return { value: answer };
}
