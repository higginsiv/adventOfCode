const fr = require('../../../tools/fileReader');
const [year, day, part] = ["2021","17","2"];
const [minX, maxX, minY, maxY] = fr.getInput(year,day).map(x => {
    x = x.replace('target area: x=', '');
    x = x.replaceAll('..', ' ');
    x = x.replace(',', '');
    x = x.replace('y=', '');
    x = x.split(' ').map(y => parseInt(y));
    return x;
})[0];

const [xStart, yStart] = [0, 0];

class Velocity {
    x;
    y;
    steps;
    constructor(y, steps) {
        this.y = y;
        this.steps = steps;
    }
}
// Idea here is that Y must equal 0 again on the downswing, and the fastest y can
// be going has to still barely clip the bottom of the valid y box. This probably 
// doesn't work directly for non negative y's but yolo
const yVelMax = factorialAddition(yStart - minY) - Math.abs(minY);
const yVelMin = minY;

console.log(yVelMin)
console.log(yVelMax)
let velocities = [];
for (let yVel = yVelMin; yVel <= yVelMax; yVel++) {
    let vel = yVel;
    let pos = yStart;
    let steps = 0;
    while (true) {
        steps++;
        pos += yVel;
        if (pos >= minY && pos <= maxY) {
            velocities.push(new Velocity(yVel, steps))
        }
        if (pos <= minY) {
            console.log('another')
            break;
        }
        vel--;
    } 
}

console.log(velocities)
/** Idk the math name but imagine a factorial that adds intstead of multiplying */
function factorialAddition(int) {
    let res = 0;
    while (int > 0) {
        res += int;
        int--;
    }
    return res;
}

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);