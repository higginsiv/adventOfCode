const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2022', '15', '2'];
const data = fr.getInput(year, day).map((x) => {
    x = x.replace('Sensor at x=', '');
    x = x.replace(': closest beacon is at x=', ' ');
    x = x.replaceAll(', y=', ' ');
    return x.split(' ').map((x) => parseInt(x));
});
const GOOD = 'GOOD';
const maxGridSize = 4000000;
// const maxGridSize = 20;

let answer;

let sensors = [];

class Sensor {
    x;
    y;
    size;
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }
}

data.forEach((x) => {
    const [sensorX, sensorY, beaconX, beaconY] = x;
    const distance = getDistance(sensorX, sensorY, beaconX, beaconY);

    sensors.push(new Sensor(sensorX, sensorY, distance));
});

sensors.sort((a, b) => {
    let sort = a.y - b.y;
    if (sort === 0) {
        sort = a.x - b.x;
        if (sort === 0) {
            sort = a.size - b.size;
        }
    }
    return sort;
});

for (let i = 0; i < maxGridSize; i++) {
    let rowToCheck = i;
    let pairs = [];

    sensors.forEach((s) => {
        if (s.y < rowToCheck && s.y + s.size >= rowToCheck) {
            let rowSpan = s.y + s.size - rowToCheck;
            // don't have to check for beacons since they are essentially invalid in this part
            pairs.push([s.x - rowSpan, s.x + rowSpan]);
        }

        if (s.y > rowToCheck && s.y - s.size <= rowToCheck) {
            let rowSpan = rowToCheck - (s.y - s.size);
            // don't have to check for beacons since they are essentially invalid in this part
            pairs.push([s.x - rowSpan, s.x + rowSpan]);
        }

        if (s.y === rowToCheck) {
            pairs.push([s.x - s.size, s.x + s.size]);
        }
    });

    let gap = buildSegment(pairs);
    if (gap !== GOOD) {
        answer = gap * 4000000 + rowToCheck;
        break;
    }
}

function getDistance(x, y, a, b) {
    return Math.abs(x - a) + Math.abs(y - b);
}

function buildSegment(pairs) {
    pairs.sort((a, b) => {
        let sort = a[0] - b[0];
        if (sort === 0) {
            sort = a[1] - b[1];
        }
        return sort;
    });

    let segment = [pairs[0][0], pairs[0][1]];
    for (let i = 1; i < pairs.length; i++) {
        [p1a, p1b] = pairs[i];
        [sega, segb] = segment;

        if (p1a >= sega && p1a <= segb) {
            if (p1b > segb) {
                segment[1] = p1b;
            }
        } else {
            return p1a - 1;
        }
    }
    return GOOD;
}

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
