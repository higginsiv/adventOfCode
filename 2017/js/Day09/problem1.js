module.exports = { solve: solve };

function solve({ lines, rawData }) {
    let chars = rawData.split('');

    let i = 0;
    let score = 0;
    let openBraces = 0;
    let openGarbage = false;
    while (i < chars.length) {
        const char = chars[i];
        if (openGarbage) {
            if (char === '!') {
                i++;
            } else if (char === '>') {
                openGarbage = false;
            }
            i++;
            continue;
        }

        if (char === '<') {
            openGarbage = true;
        } else if (char === '{') {
            openBraces++;
        } else if (char === '}') {
            score += openBraces;
            openBraces--;
        }
        i++;
    }
    const answer = score;
    return { value: answer };
}
