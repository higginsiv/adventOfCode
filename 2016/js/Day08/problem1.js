const fr = require('../../../tools/fileReader');
const OUTPUT = require('../../../tools/output');
const [YEAR, DAY, PART] = ['2016', '08', '1'];
const [ON, OFF] = [1, 0];

let screen = Array.from(Array(6), () => new Array(50).fill(OFF));
const DATA = fr.getInput(YEAR, DAY).forEach((line) => {
    let [command, ...args] = line.split(' ');
    switch (command) {
        case 'rect':
            let [width, height] = args[0].split('x').map(Number);
            for (let i = 0; i < height; i++) {
                for (let j = 0; j < width; j++) {
                    screen[i][j] = ON;
                }
            }
            break;
        case 'rotate':
            let [direction, index, amount] = [
                args[0],
                args[1].split('=').map(Number)[1],
                parseInt(args[3]),
            ];
            switch (direction) {
                case 'row':
                    screen[index] = screen[index]
                        .slice(-amount)
                        .concat(screen[index].slice(0, -amount));
                    break;
                case 'column':
                    let column = screen.map((row) => row[index]);
                    column = column.slice(-amount).concat(column.slice(0, -amount));
                    screen.forEach((row, i) => (row[index] = column[i]));
                    break;
            }
            break;
    }
});

let answer = screen.reduce(
    (total, row) => total + row.reduce((total, pixel) => total + pixel, 0),
    0,
);
OUTPUT.output(YEAR, DAY, PART, answer);
