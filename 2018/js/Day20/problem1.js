module.exports = {solve: solve};

function solve({lines, rawData}) {
    function getKey(x, y) {
        return `${x},${y}`;
    }

    let directions = rawData.substring(1, rawData.length - 1).split('');

    let current = {x: 0, y: 0};
    let locations = new Map()
    let stack = [];
    let index = 0;
    while (index < directions.length) {
        let direction = directions[index];
        if (direction === '(') {
            stack.push({x: current.x, y: current.y});
        } else if (direction === ')') {
            // TODO not sure if this pop makes sense
            current = stack.pop();
        } else if (direction === '|') {
            current = stack[stack.length - 1];
        } else {
            // TODO set up doors
            let x = current.x;
            let y = current.y;
            if (direction === 'N') {
                y--;
            } else if (direction === 'E') {
                x++;
            } else if (direction === 'S') {
                y++;
            } else if (direction === 'W') {
                x--;
            }
            let locationkey = getKey(x, y);

            if (!locations.has(locationkey)) {
                locations.set(locationkey, {
                    x: x,
                    y: y,
                    doors: new Set()
                });
            }

            let location = locations.get(locationkey);
            location.doors.add(direction);

            current = {x: x, y: y};
        }
        index++;
    }
    const answer = null;
    return {value: answer};
}