module.exports = { solve: solve };

function solve({ lines, rawData }) {
    let gamma = [];
    let epsilon = [];
    let digitCounter = [];

    lines.forEach((x) => {
        x.split('').forEach((y, index) => {
            if (digitCounter[index] == null) {
                digitCounter[index] = {
                    numZero: 0,
                    numOne: 0,
                };
            }
            if (y === '0') {
                digitCounter[index].numZero++;
            } else {
                digitCounter[index].numOne++;
            }
        });
    });

    digitCounter.forEach((x, index) => {
        gamma[index] = x.numZero > x.numOne ? 0 : 1;
        epsilon[index] = gamma[index] * -1 + 1;
    });

    let gammaDecimal = parseInt(gamma.join(''), 2);
    let epsilonDecimal = parseInt(epsilon.join(''), 2);
    const answer = gammaDecimal * epsilonDecimal;
    return { value: answer };
}
