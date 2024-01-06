const fs = require('node:fs');
const BLACK = '⬛';
const WHITE = '⬜';

module.exports = {
    output: output,
};

function output(year, day, part, answer, strategy='console') {
    switch (strategy) {
        case 'console':
            console.log(answer);
            break;
        case 'file':
            fs.writeFileSync(`${year}/js/Day${day}/output-${part}.txt`, String(answer));
            break;
        case 'grid':
            printGrid(answer);
            break;
    }
}

function printGrid(args) {
    let [grid, whiteChars] = args;
    grid = grid.map(row => row.map(char => whiteChars.includes(char) ? WHITE : BLACK));
    grid.forEach(row => console.log(row.join('')));
}