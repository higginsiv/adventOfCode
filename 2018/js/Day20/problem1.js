module.exports = {solve: solve};

function solve({lines, rawData}) {
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

    // TODO have array of locations
    // TODO have stack of possible moves
    let current = {x: 0, y: 0, doors: new Set()};

    let endPoints = [current];
    let locations = new Map()
    locations.set(getKey(0, 0), current);
    let stack = [];
    let index = 0;
    while (index < directions.length) {
        let direction = directions[index];
        if (direction === '(') {
            let newEndPoints = [];
            for (let i = 0; i < endPoints.length; i++) {
                newEndPoints.push({x: endPoints[i].x, y: endPoints[i].y, doors: endPoints[i].doors});
            }
            stack.push(newEndPoints);
        } else if (direction === ')') {
            // TODO not sure if this pop makes sense
            endPoints = stack.pop();
        } else if (direction === '|') {
            // todo record new endpoint
            endPoints = stack[stack.length - 1];
        } else {
            let newEndPoints = [];
            let oppositeDirection = getOpposite(direction);

            for (let i = 0; i < endPoints.length; i++) {
                let current = endPoints[i];
                console.log(`current: ${current.x},${current.y} direction: ${direction} doors: ${current.doors}`);
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
                        doors: new Set()
                    });
                }
    
                let location = locations.get(locationkey);
                location.doors.add(oppositeDirection);
    
                current = {x: x, y: y, doors: location.doors};
                newEndPoints.push(current);
            }
            endPoints = newEndPoints;
        }
        index++;
    }
    console.log(locations);
    const answer = null;
    return {value: answer};
}