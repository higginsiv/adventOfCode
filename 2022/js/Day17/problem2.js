const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2022', '17', '2'];

const [LEFT, RIGHT] = [-1, 1];
const data = fr.getInput(year, day, '').map((x) => (x === '<' ? LEFT : RIGHT));

const [HOR, PLUS, EL, VERT, BOX] = [0, 1, 2, 3, 4];
const SOLID = 1;
const CYCLE = 'cycle baby';
const CYCLE_SIZE = 1;

let highY = 0;

class Point {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Rock {
    points = [];
    type;
    constructor(leftEdge, highEdge, type) {
        this.type = type;
        switch (type) {
            case HOR:
                this.points.push(
                    new Point(leftEdge + 2, highEdge + 3),
                    new Point(leftEdge + 3, highEdge + 3),
                    new Point(leftEdge + 4, highEdge + 3),
                    new Point(leftEdge + 5, highEdge + 3),
                );
                break;
            case PLUS:
                this.points.push(
                    new Point(leftEdge + 2, highEdge + 4),
                    new Point(leftEdge + 3, highEdge + 3),
                    new Point(leftEdge + 3, highEdge + 4),
                    new Point(leftEdge + 3, highEdge + 5),
                    new Point(leftEdge + 4, highEdge + 4),
                );
                break;
            case EL:
                this.points.push(
                    new Point(leftEdge + 2, highEdge + 3),
                    new Point(leftEdge + 3, highEdge + 3),
                    new Point(leftEdge + 4, highEdge + 3),
                    new Point(leftEdge + 4, highEdge + 4),
                    new Point(leftEdge + 4, highEdge + 5),
                );
                break;
            case VERT:
                this.points.push(
                    new Point(leftEdge + 2, highEdge + 3),
                    new Point(leftEdge + 2, highEdge + 4),
                    new Point(leftEdge + 2, highEdge + 5),
                    new Point(leftEdge + 2, highEdge + 6),
                );
                break;
            case BOX:
                this.points.push(
                    new Point(leftEdge + 2, highEdge + 3),
                    new Point(leftEdge + 3, highEdge + 3),
                    new Point(leftEdge + 2, highEdge + 4),
                    new Point(leftEdge + 3, highEdge + 4),
                );
                break;
        }
    }
}

let keys = new Set();
let keysToRocks = new Map();
let keysToHeight = new Map();
let rocksInCycle;
let heightInCycle;
function storeKey(rockType, edge, data, rocks) {
    let copy = edge.slice(-CYCLE_SIZE);
    let key = rockType + '.' + copy + '.' + data;
    if (keys.has(key)) {
        console.log('cycle baby');
        // console.log(edge);
        rocksInCycle = rocks - keysToRocks.get(key);
        heightInCycle = edge.length - keysToHeight.get(key);
        return CYCLE;
    } else {
        keys.add(key);
        keysToRocks.set(key, rocks);
        keysToHeight.set(key, edge.length);
    }
}

function moveRock(rock, edge, xDir, yDir) {
    let tempPoints = [];
    for (let i = 0; i < rock.points.length; i++) {
        let p = rock.points[i];
        let tempX = p.x + xDir;
        let tempY = p.y + yDir;

        if (
            tempX < 0 ||
            tempX > 6 ||
            tempY < 0 ||
            (edge[tempY] != null && edge[tempY][tempX] === SOLID)
        ) {
            return rock;
        } else {
            tempPoints.push(new Point(tempX, tempY));
        }
    }

    rock.points = tempPoints;
    return rock;
}

function getEdge(rock) {
    rockPoints = rock.points;
    rockPoints.forEach((p) => {
        if (p.y + 1 > highY) {
            highY = p.y + 1;
        }
        if (edge[p.y] == null) {
            edge[p.y] = [];
        }
        edge[p.y][p.x] = SOLID;
    });

    return edge;
}

const maxRocks = 1000000000000;
let rockType = 0;
let cycleBonus = 0;
let edge = [];
edge[0] = [];

for (let i = 1; i <= maxRocks; i++) {
    if (i % 1000000 === 0) {
        console.log(i);
    }
    let rock = new Rock(0, highY, rockType);

    let moving = true;
    while (moving) {
        let dir = data.shift();
        data.push(dir);

        rock = moveRock(rock, edge, dir, 0);

        let ogX = rock.points[0].x;
        let ogY = rock.points[0].y;
        rock = moveRock(rock, edge, 0, -1);

        if (rock.points[0].x === ogX && rock.points[0].y === ogY) {
            moving = false;
            edge = getEdge(rock);
        }
    }

    if (edge.length >= CYCLE_SIZE) {
        if (cycleBonus === 0) {
            let foundCycle = storeKey(rock.type, edge, data, i);
            if (foundCycle === CYCLE) {
                let rocksSoFar = i;

                i = maxRocks - ((maxRocks - rocksSoFar) % rocksInCycle);
                cycleBonus = Math.floor((maxRocks - rocksSoFar) / rocksInCycle) * heightInCycle;
            }
        }
    }
    rockType = (rockType + 1) % 5;
}

let answer = highY + cycleBonus;
console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
