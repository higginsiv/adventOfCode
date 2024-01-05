const fr = require('../../../tools/fileReader');
const OUTPUT = require('../../../tools/output');
const [YEAR, DAY, PART] = ["2016","09","2"];

const DATA = fr.getInput(YEAR,DAY)[0].trim();

function getDecompressedLength(compressed) {
    let decompressed = 0;
    let i = 0;
    while (i < compressed.length) {
        if (compressed[i] === '(') {
            let marker = '';
            i++;
            while (compressed[i] !== ')') {
                marker += compressed[i];
                i++;
            }
            let [numChars, numRepeat] = marker.split('x').map(Number);
            i++;

            let toRepeat = compressed.substr(i, numChars);
            decompressed += getDecompressedLength(toRepeat) * numRepeat;
            i += numChars;
        } else {
            decompressed++;
            i++;
        }
    }
    return decompressed;
}

let answer = getDecompressedLength(DATA);
OUTPUT.output(YEAR, DAY, PART, answer);