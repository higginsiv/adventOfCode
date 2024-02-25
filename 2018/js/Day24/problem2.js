module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const { getGroups, runSimulation } = require('./problem1');
    const { floor } = Math;

    const INFECTION = 1;
    let minBoost = 1;
    let maxBoost;
    let currentBoost = 50;
    let groups;

    while (true) {
        groups = runSimulation(getGroups(rawData), currentBoost);
        const hasInfection = groups.some((group) => group.affiliation === INFECTION);

        if (hasInfection) {
            minBoost = currentBoost;
            if (!maxBoost) {
                currentBoost *= 2;
                continue;
            } else {
                currentBoost = floor((currentBoost + maxBoost) / 2);
            }
        } else if (!hasInfection) {
            maxBoost = currentBoost;
            currentBoost = floor((currentBoost + minBoost) / 2);
        }
        if (maxBoost && maxBoost - minBoost <= 1) {
            break;
        }
    }

    const answer = groups.reduce((acc, group) => acc + group.units, 0);
    return { value: answer };
}
