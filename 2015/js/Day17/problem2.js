module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const data = lines.map((x) => parseInt(x)).sort((a, b) => b - a);

    const MAX = 150;
    let numContainersToFrequency = new Map();
    getValidOptions(0, data.slice(), 0);
    let answer = numContainersToFrequency.get(
        [...numContainersToFrequency.keys()].sort((a, b) => a - b)[0],
    );

    function getValidOptions(currentVolume, containers, containersUsed) {
        let localValid = 0;

        containers.forEach((container, index) => {
            if (currentVolume + container === MAX) {
                localValid++;
                numContainersToFrequency.set(
                    containersUsed,
                    numContainersToFrequency.get(containersUsed) == null
                        ? 1
                        : numContainersToFrequency.get(containersUsed) + 1,
                );
            } else if (currentVolume + container < MAX) {
                localValid += getValidOptions(
                    currentVolume + container,
                    containers.slice(index + 1),
                    containersUsed + 1,
                );
            }
        });

        return localValid;
    }

    return { value: answer };
}
