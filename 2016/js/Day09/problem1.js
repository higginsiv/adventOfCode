export default function solve({ lines, rawData }) {
    let decompressed = '';
    const DATA = rawData.trim();

    let i = 0;
    while (i < DATA.length) {
        if (DATA[i] === '(') {
            let marker = '';
            i++;
            while (DATA[i] !== ')') {
                marker += DATA[i];
                i++;
            }
            let [numChars, numRepeat] = marker.split('x').map(Number);
            i++;

            let toRepeat = DATA.substr(i, numChars);
            for (let j = 0; j < numRepeat; j++) {
                decompressed += toRepeat;
            }
            i += numChars;
        } else {
            decompressed += DATA[i];
            i++;
        }
    }

    const answer = decompressed.length;
    return { value: answer };
}
