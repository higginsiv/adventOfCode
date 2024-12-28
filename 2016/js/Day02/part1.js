export default function solve({ lines, rawData }) {
    const KEYPAD = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
    ];
    let position = [1, 1];
    let code = '';
    const DATA = lines
        .map((x) => x.split(''))
        .forEach((line) => {
            line.forEach((move) => {
                switch (move) {
                    case 'U':
                        position[0] = position[0] > 0 ? position[0] - 1 : position[0];
                        break;
                    case 'D':
                        position[0] = position[0] < 2 ? position[0] + 1 : position[0];
                        break;
                    case 'L':
                        position[1] = position[1] > 0 ? position[1] - 1 : position[1];
                        break;
                    case 'R':
                        position[1] = position[1] < 2 ? position[1] + 1 : position[1];
                        break;
                }
            });

            code += KEYPAD[position[0]][position[1]];
        });

    let answer = code;

    return { value: answer };
}
