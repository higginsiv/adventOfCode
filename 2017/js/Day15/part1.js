export default function solve({ lines, rawData }) {
    function generateNextValue(value, factor) {
        return (value * factor) % 2147483647;
    }

    lines = lines.map((line) => line.match(/(\d+)/g).map(Number));

    const aFactor = 16807;
    const bFactor = 48271;

    let a = lines[0][0];
    let b = lines[1][0];
    let answer = 0;

    for (let i = 0; i < 40000000; i++) {
        a = generateNextValue(a, aFactor);
        b = generateNextValue(b, bFactor);

        if ((a & 0xffff) === (b & 0xffff)) {
            answer++;
        }
    }

    return { value: answer };
}
