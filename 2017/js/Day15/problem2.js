module.exports = { solve: solve };

function solve({ lines, rawData }) {
    function generateNextValue(value, factor, multipleOf) {
        while (true) {
            value = (value * factor) % 2147483647;
            if (value % multipleOf === 0) {
                return value;
            }
        }
    }

    lines = lines.map((line) => line.match(/(\d+)/g).map(Number));

    const aFactor = 16807;
    const bFactor = 48271;
    const aMultipleOf = 4;
    const bMultipleOf = 8;

    let a = lines[0][0];
    let b = lines[1][0];
    let answer = 0;

    for (let i = 0; i < 5000000; i++) {
        a = generateNextValue(a, aFactor, aMultipleOf);
        b = generateNextValue(b, bFactor, bMultipleOf);

        if ((a & 0xffff) === (b & 0xffff)) {
            answer++;
        }
    }

    return { value: answer };
}
