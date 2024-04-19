module.exports = {solve: solve};

function solve({lines, rawData}) {
    const KEYS = require('../../../tools/keys');

    const [LEFT, RIGHT] = ['L', 'R'];
    const [NORTH, EAST, SOUTH, WEST] = [0, 1, 2, 3];
    const DIRECTIONS = [NORTH, EAST, SOUTH, WEST];
    
    let x = 0;
    let y = 0;
    let direction = NORTH;
    let visited = new Set();
    visited.add(KEYS.generateKey(x, y));
    
    const DATA = rawData.split(', ').map((x) => {
        const direction = x[0];
        const distance = parseInt(x.substring(1));
        return { direction, distance };
    });
    
    let visitedTwice = false;
    for (movement of DATA) {
        switch (movement.direction) {
            case LEFT:
                direction = DIRECTIONS[(direction + 3) % 4];
                break;
            case RIGHT:
                direction = DIRECTIONS[(direction + 1) % 4];
                break;
        }
    
        for (let i = 0; i < movement.distance; i++) {
            switch (direction) {
                case NORTH:
                    y += 1;
                    break;
                case EAST:
                    x += 1;
                    break;
                case SOUTH:
                    y -= 1;
                    break;
                case WEST:
                    x -= 1;
                    break;
            }
    
            const key = KEYS.generateKey(x, y);
            if (visited.has(key)) {
                visitedTwice = true;
                break;
            }
            visited.add(key);
        }
        if (visitedTwice) {
            break;
        }
    }
    
    let answer = Math.abs(x) + Math.abs(y);
    
    return {value: answer};
}