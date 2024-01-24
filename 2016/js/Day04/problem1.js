const fr = require('../../../tools/fileReader');
const OUTPUT = require('../../../tools/output');
const [YEAR, DAY, PART] = ['2016', '04', '1'];
let answer = fr
    .getInput(YEAR, DAY)
    .map((x) => {
        const [letters, sector, checksum] = x.match(/([a-z-]+)-(\d+)\[([a-z]+)\]/).slice(1);
        return { letters, sector: parseInt(sector), checksum };
    })
    .reduce((total, current) => {
        const letters = current.letters.replace(/-/g, '').split('');
        const counts = letters.reduce((total, current) => {
            if (total[current] == null) {
                total[current] = 0;
            }

            total[current]++;
            return total;
        }, {});

        const sorted = Object.keys(counts).sort((a, b) => {
            if (counts[a] === counts[b]) {
                return a.localeCompare(b);
            }
            return counts[b] - counts[a];
        });

        const checksum = sorted.slice(0, 5).join('');
        if (checksum === current.checksum) {
            total += current.sector;
        }

        return total;
    }, 0);

OUTPUT.output(YEAR, DAY, PART, answer);
