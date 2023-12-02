const fr = require('../../../tools/fileReader');
const [YEAR, DAY, PART] = ["2023","02","1"];

const [RED, GREEN, BLUE] = [12, 13, 14];

let colorMaxes = new Map([
    ['red', RED],
    ['green', GREEN],
    ['blue', BLUE]      
]);

let idSum = 0;
fr.getInput(YEAR,DAY).forEach(x => {
    x = x.replace('Game ','');
    x = x.split(': ');

    let draws = x[1].split('; ');
    draws = draws.map(y => {
        y = y.split(', ');
        return y;
    });
    
    let valid = true;
    draws.forEach(draw => {
        draw.forEach(color => {
            color = color.split(' ');
            if (colorMaxes.get(color[1]) < parseInt(color[0])) {
                valid = false;
            }
        })
    })
    if (valid) {
        idSum += parseInt(x[0]);
    }
});

let answer = idSum;
console.log(`Year ${YEAR} Day ${DAY} Puzzle ${PART}: ${answer}`);