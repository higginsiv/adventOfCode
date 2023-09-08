console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ["2015","18","2"];
const [ON, OFF] = ['#', '.'];
const STEPS = 100;
const [LENGTH, WIDTH] = [100,100]

let lights = fr.getInput(year,day).map(line => line.split(''));
lights[0][0] = ON;
lights[0][LENGTH - 1] = ON;
lights[LENGTH - 1][0] = ON;
lights[LENGTH - 1][LENGTH - 1] = ON;

for (let i = 0; i < STEPS; i++) {
    let newLights = new Array(LENGTH);

    for (let s = 0; s < LENGTH; s++) {
        newLights[s] = Array(WIDTH);
    }
 
    for (let j = 0; j < LENGTH; j++) {
        for (let k = 0; k < WIDTH; k++) {
            if (isCorner(j, k)) {
                newLights[j][k] = ON;
                continue
            }

            let status = lights[j][k];

            let neighborsWithLights = getNeighborsWithLights(j, k);

            if (status === ON) {
                if (neighborsWithLights == 2 || neighborsWithLights == 3) {
                    newLights[j][k] = ON;
                } else {
                    newLights[j][k] = OFF;
                }
            } else if (status === OFF) {
                if (neighborsWithLights == 3) {
                    newLights[j][k] = ON;
                } else {
                    newLights[j][k] = OFF;
                }
            } else {
                console.log('error')
            }
        }
    }
    lights = newLights;

}

function isCorner(x, y) {
    return (x == 0 && y == 0) || (x == 0 & y == LENGTH - 1) || (x == LENGTH - 1 && y == 0) || (x == LENGTH - 1 && x == y);
}

function getNeighborsWithLights(x, y) {
    let withLights = 0;
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            if (i < 0 || i >= LENGTH || j < 0 || j >= WIDTH || (x === i && y === j)) {
                continue;
            }

            if (lights[i][j] == ON) {
                withLights++;
            }
        }
    }
    return withLights;
}

let answer = lights.reduce((total, curr) => {
    return total + curr.reduce((lineTotal, lineCurr) => {
        return lineTotal + ((lineCurr == ON) ? 1 : 0);
    }, 0);
}, 0);

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();