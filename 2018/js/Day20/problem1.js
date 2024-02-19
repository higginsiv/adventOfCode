module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const { max } = Math;

    function convertMapToGrid(map) {
        let lowestX = Infinity;
        let lowestY = Infinity;
        let highestX = -Infinity;
        let highestY = -Infinity;

        for (let value of map.values()) {
            const x = value.x;
            const y = value.y;
            if (x < lowestX) {
                lowestX = x;
            }
            if (x > highestX) {
                highestX = x;
            }
            if (y < lowestY) {
                lowestY = y;
            }
            if (y > highestY) {
                highestY = y;
            }
        }

        let grid = Array(highestY - lowestY + 1)
            .fill(null)
            .map(() => Array(highestX - lowestX + 1).fill('#'));
        for (let location of map.values()) {
            const { x, y } = location;
            grid[y - lowestY][x - lowestX] = location;
        }
        const start = [0 - lowestY, 0 - lowestX];
        return [grid, start];
    }

    function getOpposite(direction) {
        if (direction === 'N') {
            return 'S';
        } else if (direction === 'E') {
            return 'W';
        } else if (direction === 'S') {
            return 'N';
        } else if (direction === 'W') {
            return 'E';
        }
    }

    function getKey(x, y) {
        return `${x},${y}`;
    }

    let directions = rawData.substring(1, rawData.length - 1).split('');

    let current = { x: 0, y: 0, doors: new Set(), key: getKey(0, 0) };

    let endPoints = [current];
    let locations = new Map();
    locations.set(getKey(0, 0), current);
    let stack = [];
    let index = 0;
    while (index < directions.length) {
        let direction = directions[index];
        if (direction === '(') {
            let newEndPoints = [];
            for (let i = 0; i < endPoints.length; i++) {
                newEndPoints.push({
                    x: endPoints[i].x,
                    y: endPoints[i].y,
                    doors: endPoints[i].doors,
                });
            }
            stack.push(newEndPoints);
        } else if (direction === ')') {
            endPoints = stack.pop();
        } else if (direction === '|') {
            endPoints = stack[stack.length - 1];
        } else {
            let newEndPoints = [];
            let oppositeDirection = getOpposite(direction);

            for (let i = 0; i < endPoints.length; i++) {
                let current = endPoints[i];

                current.doors.add(direction);
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
                        key: locationkey,
                        x: x,
                        y: y,
                        doors: new Set(),
                    });
                }

                let location = locations.get(locationkey);
                location.doors.add(oppositeDirection);

                current = { x: x, y: y, doors: location.doors };
                newEndPoints.push(current);
            }
            endPoints = newEndPoints;
        }
        index++;
    }

    let [grid, start] = convertMapToGrid(locations);

    let queue = [{ y: start[0], x: start[1], doors: 0 }];
    let visitedToDoorsRequired = new Map();
    while (queue.length > 0) {
        let { y, x, doors } = queue.shift();
        let location = grid[y][x];
        if (location === '#') {
            continue;
        }
        if (visitedToDoorsRequired.has(location.key)) {
            continue;
        } else {
            visitedToDoorsRequired.set(location.key, doors);
        }

        for (let door of location.doors) {
            if (door === 'N') {
                queue.push({ y: y - 1, x: x, doors: doors + 1 });
            } else if (door === 'E') {
                queue.push({ y: y, x: x + 1, doors: doors + 1 });
            } else if (door === 'S') {
                queue.push({ y: y + 1, x: x, doors: doors + 1 });
            } else if (door === 'W') {
                queue.push({ y: y, x: x - 1, doors: doors + 1 });
            }
        }
    }

    const answer = max(...Array.from(visitedToDoorsRequired.values()));
    return { value: answer };
}
