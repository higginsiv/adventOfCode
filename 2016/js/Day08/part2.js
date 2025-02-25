import { Solution, GridStrategy } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    const [ON, OFF] = [1, 0];

    let screen = Array.from(Array(6), () => new Array(50).fill(OFF));
    const DATA = lines.forEach((line) => {
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

    return new Solution(screen, new GridStrategy(ON));
}
