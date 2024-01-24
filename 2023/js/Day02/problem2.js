const fr = require('../../../tools/fileReader');
const [YEAR, DAY, PART] = ['2023', '02', '2'];

let powerSum = 0;
fr.getInput(YEAR, DAY).forEach((x) => {
    x = x.replace('Game ', '');
    x = x.split(': ');

    let draws = x[1].split('; ');
    draws = draws.map((y) => {
        y = y.split(', ');
        return y;
    });

    let minRed = -Infinity;
    let minGreen = -Infinity;
    let minBlue = -Infinity;

    draws.forEach((draw) => {
        draw.forEach((color) => {
            color = color.split(' ');
            if (parseInt(color[0]) > minRed && color[1] === 'red') {
                minRed = parseInt(color[0]);
            }
            if (parseInt(color[0]) > minGreen && color[1] === 'green') {
                minGreen = parseInt(color[0]);
            }
            if (parseInt(color[0]) > minBlue && color[1] === 'blue') {
                minBlue = parseInt(color[0]);
            }
        });
    });
    powerSum += minRed * minGreen * minBlue;
});

let answer = powerSum;
console.log(`Year ${YEAR} Day ${DAY} Puzzle ${PART}: ${answer}`);
