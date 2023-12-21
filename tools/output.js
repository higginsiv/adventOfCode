const fs = require('node:fs');

module.exports = {
    output: output,
};

function output(year, day, part, answer, strategy='console') {
    switch (strategy) {
        case 'console':
            console.log(`Year ${year} Day ${day} Puzzle ${part}: ${answer}`);
            break;
        case 'file':
            fs.writeFileSync(`${year}/js/Day${day}/output-${part}.txt`, String(answer));
            break;
    }
}