module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const DATA = lines.map((x) => x.match(/\d+/g).map(Number));

    let answer = 0;
    for (let i = 0; i < DATA.length; i += 3) {
        for (let j = 0; j < 3; j++) {
            let [a, b, c] = [DATA[i][j], DATA[i + 1][j], DATA[i + 2][j]];
            if (a + b > c && a + c > b && b + c > a) {
                answer++;
            }
        }
    }
    return { value: answer };
}
