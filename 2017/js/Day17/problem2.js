module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const steps = parseInt(rawData);

    let lastAtIndexOne;
    let lastIndex = 0;
    let index;
    for (let i = 1; i <= 50000000; i++) {
        index = ((steps + lastIndex) % i) + 1;
        if (index === 1) {
            lastAtIndexOne = i;
        }

        lastIndex = index;
    }

    const answer = lastAtIndexOne;
    return { value: answer };
}
