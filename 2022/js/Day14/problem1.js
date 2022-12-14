const fr = require('../../../tools/fileReader');
const [year, day, part] = ["2022","14","1"];
const data = fr.getInput(year,day).map(x => x.split(' -> ').map(x => x.split(',').map(x => parseInt(x))));
const ROCK = '#';
const SAND = 'O';
const MORE = 1;
const VOID = 0;
console.log(data[1])
let cave = [];
// "lowest" but I'm shooting sand into the sky
let highestRock = 0;
let sandFallen = 0;

data.forEach(path => {
    console.log(path);
    for (let i = 0; i < path.length - 1; i++) {
        let [p1x, p1y] = path[i];
        let [p2x, p2y] = path[i + 1];

        let [lowx, highx] = [p1x, p2x].sort();
        let [lowy, highy] = [p1y, p2y].sort();
        if (highy > highestRock) {
            highestRock = highy;
        }

        if (p1x === p2x) {
            // vertical line
            for (let y = lowy; y <= highy; y++) {
                if (cave[y] == null) {
                    cave[y] = [];
                }
                cave[y][p1x] = ROCK;
            }
        } else {
            // horizontal line
            for (let x = lowx; x <= highx; x++) {
                if (cave[p1y] == null) {
                    cave[p1y] = [];
                }
                cave[p1y][x] = ROCK;
            }
        }
    }
});

function sandFall(x, y) {
    if (y > highestRock) {
        return VOID;
    }
    if (isEmpty(x, y + 1)) {
        return sandFall(x, y + 1);
    } else if (isEmpty(x - 1, y + 1)) {
        return sandFall(x - 1, y + 1);
    } else if (isEmpty(x + 1, y + 1)) {
        return sandFall(x + 1, y + 1);
    } else {
        sandFallen++;
        // console.log(sandFallen + ' x: ' + x + ' y: ' + y)
        sands.add(x + ' ' + y);
        cave[y][x] = SAND;
        return MORE;
    }
}

function isEmpty(x, y) {
    if (cave[y] == null) {
        console.log(cave[y])
        console.log(y)
        cave[y] = [];
    }
    if (cave[y][x] !== ROCK && cave[y][x] !== SAND) {
        // console.log(cave[y][x])
    }
    return cave[y][x] !== ROCK && cave[y][x] !== SAND;
}

let sands = new Set();
// console.log(cave[498][8]);
let choice;
let loops = 0;
// do {
//     loops++;
//     choice = sandFall(500, 0);
// } while (choice === MORE)

while (true) {
    if (sandFall(500, 0) === VOID) {
        break;
    };
}

let s = 0;
for (let i =0; i < 1000; i++) {
    if (cave[i] == null) {
        cave[i] = []
    }
    let tolog = '';
    for (let j = 425; j < 550; j++) {
        if (cave[i][j] == null) {
            cave[i][j] = '.'
        } else if(cave[i][j] == SAND) {
                s++;
        }
        tolog += cave[i][j];
    }
    console.log(tolog)
    // console.log(EOL);
}
// console.log(s)
// console.log(highestRock)
// console.log(loops)
console.log(sands.size)
let answer = sandFallen;
console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);