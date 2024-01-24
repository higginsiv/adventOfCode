module.exports = { solve: solve };

function solve({ lines, rawData }) {
    let answer = lines
        .map((line) => line.split(' '))
        .reduce((acc, line) => {
            let duplicates = line.filter(
                (word, index) => line.indexOf(word) !== index
            );
            return acc + (duplicates.length > 0 ? 0 : 1);
        }, 0);
    return { value: answer };
}
