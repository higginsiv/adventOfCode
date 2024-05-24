module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const data = lines.map((x) =>
        x.split('').map((y) => {
            return {
                risk: parseInt(y),
                lowRisk: null,
            };
        }),
    );

    const goalX = data.length - 1;
    const goalY = data[0].length - 1;

    traverse(0, 0, 0);

    function traverse(x, y, riskCount) {
        if (x > goalX || y > goalY || x < 0 || y < 0) {
            return;
        }

        if (x + y !== 0) {
            riskCount += data[x][y].risk;
        }

        const currentLowRisk = data[x][y].lowRisk;

        if (currentLowRisk == null || data[x][y].lowRisk > riskCount) {
            data[x][y].lowRisk = riskCount;
        } else {
            return;
        }

        traverse(x + 1, y, riskCount);
        traverse(x, y + 1, riskCount);
        // Not actually needed for my data set
        traverse(x, y - 1, riskCount);
    }

    const answer = data[goalX][goalY].lowRisk;

    return { value: answer };
}
