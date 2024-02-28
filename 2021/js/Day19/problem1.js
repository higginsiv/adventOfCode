module.exports = {solve: solve};
const EOL = require('os').EOL;
function solve({lines, rawData}) {
    let scanners = new Map();
    rawData.split(EOL + EOL).forEach((scanner, index) => {
       let lines = scanner.split(EOL);
       lines.shift();
       lines = lines.map(line => {
            line = line.match(/-?\d+/g).map(Number);
            return {x: line[0], y: line[1], z: line[2]};
       });
       scanners.set(index, lines);
    });
    
    console.log('scanners',scanners.size);
    scanners = Array.from(scanners.values()).forEach(scanner => {
        console.log(scanner.length);
    });
    const answer = null;
    return {value: answer};
}