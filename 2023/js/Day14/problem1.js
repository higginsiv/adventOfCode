module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const DATA = lines.map((x) => x.split(''));
    const [ROUND, CUBE] = ['O', '#'];

    let totalLoad = 0;
    for (let j = 0; j < DATA[0].length; j++) {
        let currentBlocker = -1;
        for (let i = 0; i < DATA.length; i++) {
            const rock = DATA[i][j];
            if (rock === CUBE) {
                currentBlocker = i;
            } else if (rock === ROUND) {
                currentBlocker += 1;
                totalLoad += DATA.length - currentBlocker;
            }
        }
    }

    const answer = totalLoad;
    return { value: answer };
}
