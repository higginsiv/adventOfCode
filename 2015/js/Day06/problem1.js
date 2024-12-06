import { default as generateKey } from '#tools/keys.js';
export default function solve({ lines, rawData }) {
    const [ON, OFF, TOGGLE] = [0, 1, 2];

    let lightsOn = new Set();

    lines.forEach((line) => {
        let instruction;
        line = line.replace(' through ', ' ');
        if (line.includes('turn on')) {
            instruction = ON;
            line = line.substring(8);
        } else if (line.includes('turn off')) {
            instruction = OFF;
            line = line.substring(9);
        } else if (line.includes('toggle')) {
            instruction = TOGGLE;
            line = line.substring(7);
        }

        line = line.split(' ').map((coord) => coord.split(','));

        let x1 = parseInt(line[0][0]);
        let x2 = parseInt(line[1][0]);
        let y1 = parseInt(line[0][1]);
        let y2 = parseInt(line[1][1]);

        for (let i = x1; i <= x2; i++) {
            for (let j = y1; j <= y2; j++) {
                let key = generateKey(i, j);

                if (instruction == ON) {
                    lightsOn.add(key);
                } else if (instruction == OFF) {
                    lightsOn.delete(key);
                } else if (instruction == TOGGLE) {
                    if (lightsOn.has(key)) {
                        lightsOn.delete(key);
                    } else {
                        lightsOn.add(key);
                    }
                }
            }
        }
    });

    const answer = lightsOn.size;
    return { value: answer };
}
