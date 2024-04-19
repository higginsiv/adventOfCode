module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const DATA = rawData.trim();

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

    const answer = getDecompressedLength(DATA);
    return { value: answer };
}
