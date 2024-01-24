module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const { max } = Math;
    let registers = rawData.match(/\d+/g).map(Number);
    let seen = new Map();
    let steps = 0;
    while (!seen.has(registers.join('|'))) {
        seen.set(registers.join('|'), steps);
        let highest = max(...registers);
        let index = registers.indexOf(highest);
        registers[index] = 0;
        while (highest > 0) {
            index = (index + 1) % registers.length;
            registers[index]++;
            highest--;
        }
        steps++;
    }
    let answer = steps - seen.get(registers.join('|'));
    return { value: answer };
}
