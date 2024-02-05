module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const difference = 'A'.charCodeAt(0) - 'a'.charCodeAt(0);
    let destroyed = true;
    let destroyedIndex = 0;

    while (destroyed) {
        let nonProcessed = rawData.substring(0, destroyedIndex);
        let next = nonProcessed === '' ? [] : nonProcessed.split('');

        destroyed = false;
        let i = destroyedIndex;
        while (i < rawData.length) {
            if (i === rawData.length - 1) {
                next.push(rawData[i]);
                break;
            }
            let currentCharCode = rawData.charCodeAt(i);
            let nextCharCode = rawData.charCodeAt(i + 1);
            if (
                currentCharCode - nextCharCode === difference ||
                nextCharCode - currentCharCode === difference
            ) {
                if (!destroyed) {
                    destroyedIndex = i === 0 ? 0 : i - 1;
                }
                destroyed = true;
                i += 2;
            } else {
                next.push(rawData[i]);
                i++;
            }
        }
        rawData = next.join('');
    }

    const answer = rawData.length;
    return { value: answer };
}
