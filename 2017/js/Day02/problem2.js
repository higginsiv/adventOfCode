module.exports = { solve: solve };

function solve({ lines, rawData }) {
    let answer = lines
        .map((line) => {
            return line
                .match(/\d+/g)
                .map((value) => parseInt(value))
                .sort((a, b) => b - a);
        })
        .reduce((sum, curr) => {
            for (let i = 0; i < curr.length - 1; i++) {
                for (let j = i + 1; j < curr.length; j++) {
                    if (curr[i] % curr[j] === 0) {
                        return sum + curr[i] / curr[j];
                    }
                }
            }
        }, 0);

    return { value: answer };
}
