export default function solve({ lines, rawData }) {
    const KEYPAD = [
        ['-', '-', '1', '-', '-'],
        ['-', '2', '3', '4', '-'],
        ['5', '6', '7', '8', '9'],
        ['-', 'A', 'B', 'C', '-'],
        ['-', '-', 'D', '-', '-'],
    ];
    let position = [2, 0];
    let code = '';
    const DATA = lines
        .map((x) => x.split(''))
        .forEach((line) => {
            line.forEach((move) => {
                let temp = [...position];
                switch (move) {
                    case 'U':
                        temp[0] = position[0] > 0 ? position[0] - 1 : position[0];
                        break;
                    case 'D':
                        temp[0] = position[0] < KEYPAD.length - 1 ? position[0] + 1 : position[0];
                        break;
                    case 'L':
                        temp[1] = position[1] > 0 ? position[1] - 1 : position[1];
                        break;
                    case 'R':
                        temp[1] =
                            position[1] < KEYPAD[0].length - 1 ? position[1] + 1 : position[1];
                        break;
                }
                if (KEYPAD[temp[0]][temp[1]] !== '-') {
                    position = [...temp];
                }
            });

            code += KEYPAD[position[0]][position[1]];
        });

    let answer = code;

    return { value: answer };
}
