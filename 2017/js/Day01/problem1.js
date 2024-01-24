module.exports = { solve: solve };

function solve({ lines, rawData }) {
    let answer = 0;
    let matches = rawData.match(/(\d)(?=\1)/g);
    if (matches) {
        answer = matches.reduce((a, b) => parseInt(a) + parseInt(b), 0);
    }

    if (rawData[0] === rawData[rawData.length - 1]) {
        answer += parseInt(rawData[0]);
    }

    return { value: answer };
}
