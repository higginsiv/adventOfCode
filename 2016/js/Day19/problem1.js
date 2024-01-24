module.exports = { solve: solve };

function solve({ lines, rawData }) {
    // Josephus problem: https://en.wikipedia.org/wiki/Josephus_problem
    const n = Number(rawData);
    return { value: 2 * (n - Math.pow(2, Math.floor(Math.log2(n)))) + 1 };
}

// Original solution kept for posterity
function solveOriginal({ lines, rawData }) {
    let elves = Array(Number(rawData))
        .fill()
        .map((_, index) => index + 1);

    while (elves.length > 1) {
        const shouldRemoveFirst = elves.length % 2 === 1;

        elves = elves.filter((elf, index) => {
            if (index % 2 === 0) {
                return true;
            }
        });
        if (shouldRemoveFirst) {
            elves.shift();
        }
    }

    let answer = elves[0];
    return { value: answer };
}
