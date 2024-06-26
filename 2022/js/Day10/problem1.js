export default function solve({ lines, rawData }) {
    const data = lines.map((x) => {
        return x.split(' ').map((y) => {
            if (y === 'noop') {
                return 1;
            } else if (y === 'addx') {
                return 2;
            } else {
                return parseInt(y);
            }
        });
    });

    const maxCycle = 220;
    const cycleInc = 40;
    const cycleStart = 20;

    let sumCycles = [];
    for (let i = cycleStart; i <= maxCycle; i += cycleInc) {
        sumCycles.push(i);
    }

    let x = 1;
    let cycle = 1;
    let cmdLine = 0;
    let sums = 0;

    while (cycle <= maxCycle) {
        cycle++;

        data[cmdLine][0]--;
        if (data[cmdLine][0] <= 0) {
            x += data[cmdLine][1] == null ? 0 : data[cmdLine][1];
            cmdLine++;
        }

        if (sumCycles.includes(cycle)) {
            sums += x * cycle;
        }
    }

    const answer = sums;
    return { value: answer };
}
