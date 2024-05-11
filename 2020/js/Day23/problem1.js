module.exports = { solve: solve };

function solve({ lines, rawData }) {
    let data = rawData.split('').map((x) => parseInt(x));
    const MOVES = 100;

    let currIndex = 0;
    for (let i = 0; i < MOVES; i++) {
        let curr = data[currIndex];
        let removed = data.splice(currIndex + 1, 3);

        let index = -1;
        let cupToFind = curr;
        while (index === -1) {
            cupToFind -= 1;
            if (cupToFind === 0) {
                cupToFind = 9;
            }
            index = data.indexOf(cupToFind);
        }

        data.splice(index + 1, 0, ...removed);

        currIndex = data.indexOf(curr) + 1;
        if (currIndex >= data.length) {
            currIndex = 0;
        }
        let nextCup = data[currIndex];

        while (data.indexOf(nextCup) !== 0) {
            data.push(data.shift());
        }
        currIndex = 0;
    }

    while (data[0] !== 1) {
        data.push(data.shift());
    }

    const answer = parseInt(data.slice(1).join(''));
    return { value: answer };
}
