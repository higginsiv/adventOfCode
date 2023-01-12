console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ["2019","03","1"];
const [LEFT, RIGHT, UP, DOWN] = ['L', 'R', 'U', 'D'];
const [HOR, VERT] = ['h', 'v'];

let x = 0;
let y = 0;
let segments1 = new Map([[HOR, new Set()], [VERT, new Set()]]);
let segments2 = new Map([[HOR, new Set()], [VERT, new Set()]]);
let segments = [segments1, segments2];

const data = fr.getInput(year,day).map(x => {
    x = x.split(',').map(y => {
        y = y.split('');
        return [y.shift(), parseInt(y.join(''))]
    })
    return x
}).forEach((instruction, index) => {
    let s = segments[index];
    x = 0;
    y = 0;
    instruction.forEach(([dir, mag]) => {
        let newX = x;
        let newY = y;
        switch (dir) {
            case LEFT:
                newX -= mag;
                break;
            case RIGHT:
                newX += mag;
                break;
            case UP:
                newY += mag;
                break;
            case DOWN:
                newY -= mag;
                break;
        }
        let orientation = newY === y ? HOR : VERT;

        s.get(orientation).add([[x,y],[newX, newY]]);
        x = newX;
        y = newY;
    });
})

let intersections = new Set();
segments1.get(HOR).forEach(([horP1, horP2]) => {
    let y = horP1[1];
    segments2.get(VERT).forEach(([vertP1, vertP2]) => {
        let x = vertP1[0];
    })
})
console.log(segments1.get(HOR))
console.log(segments1.get(VERT))
let answer;
console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();