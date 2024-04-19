module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const answer = lines
        .map((x) => x.match(/\d+/g).map(Number))
        .reduce((total, current) => {
            let [a, b, c] = current;
            if (a + b > c && a + c > b && b + c > a) {
                total++;
            }
            return total;
        }, 0);

    return { value: answer };
}
