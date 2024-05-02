module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const data = lines;

    const EARLIEST = parseInt(data[0]);

    let bestId;
    let bestWaitTime = Infinity;
    let trains = data[1].split(',');
    trains.forEach((x) => {
        if (x !== 'x') {
            x = parseInt(x);
            let timeToWait = x - (EARLIEST % x);
            if (bestWaitTime > timeToWait) {
                bestWaitTime = timeToWait;
                bestId = x;
            }
        }
    });

    const answer = bestId * bestWaitTime;

    return { value: answer };
}
