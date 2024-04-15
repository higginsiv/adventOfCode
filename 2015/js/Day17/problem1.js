module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const data = lines.map((x) => parseInt(x)).sort((a, b) => b - a);

    const MAX = 150;
    let answer = getValidOptions(0, data.slice());

    function getValidOptions(currentVolume, containers) {
        let localValid = 0;

        containers.forEach((container, index) => {
            if (currentVolume + container === MAX) {
                localValid++;
            } else if (currentVolume + container < MAX) {
                localValid += getValidOptions(
                    currentVolume + container,
                    containers.slice(index + 1),
                );
            }
        });

        return localValid;
    }

    return { value: answer };
}
