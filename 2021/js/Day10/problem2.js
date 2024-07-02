export default function solve({ lines, rawData }) {
    const { floor } = Math;
    const data = lines.map((x) => x.split(''));

    const symbols = new Map([
        ['{', '}'],
        ['(', ')'],
        ['[', ']'],
        ['<', '>'],
    ]);

    const pointMap = new Map([
        [')', 1],
        [']', 2],
        ['}', 3],
        ['>', 4],
    ]);

    let points = [];

    for (let line of data) {
        let expected = [];
        for (let char of line) {
            if (symbols.has(char)) {
                expected.push(symbols.get(char));
            } else {
                if (expected[expected.length - 1] === char) {
                    expected.pop();
                } else {
                    expected = null;
                    break;
                }
            }
        }

        if (expected !== null) {
            let lineScore = 0;
            expected.reverse();

            expected.forEach((x) => {
                lineScore *= 5;
                lineScore += pointMap.get(x);
            });
            points.push(lineScore);
        }
    }

    points.sort((x, y) => x - y);
    const answer = points[floor(points.length / 2)];
    return { value: answer };
}
