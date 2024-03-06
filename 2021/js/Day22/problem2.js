module.exports = {solve: solve};

function solve({lines, rawData}) {
    const MIN = -50;
    const MAX = 50;
    const ON = 1;

    const instructions = parseData(lines);
    let on = new Set();
    instructions.forEach(instruction => {
        
    });

    const answer = on.size;
    return {value: answer};
}

function parseData(lines) {
    return lines.map(line => {
        line = line.replace('on', '1');
        line = line.replace('off', '0');
        line = line.match(/-?\d+/g).map(Number);
        return line;
    });
}
