module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const data = lines.map((x) => x.split(''));

    const symbols = new Map([
        ['{', '}'],
        ['(', ')'],
        ['[', ']'],
        ['<', '>'],
    ]);

    const pointMap = new Map([
        [')', 3],
        [']', 57],
        ['}', 1197],
        ['>', 25137],
    ]);

    let points = 0;

    for (let line of data) {
        let expected = [];
        for (let char of line) {
            if (symbols.has(char)) {
                expected.push(symbols.get(char));
            } else {
                if (expected[expected.length - 1] === char) {
                    expected.pop();
                } else {
                    points += pointMap.get(char);
                    break;
                }
            }
        }
    }
    const answer = points;
    return { value: answer };
}
