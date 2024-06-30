/**
 * Given a point in n dimensions, return all points that are adjacent to it.
 * @param point string in the format "d1,d2,d3,...,dn"
 */
export default function getNeighbors(point) {
    let dimensions = point.split(',');
    let neighbors = [];

    // Generate all combinations of -1, 0, and 1 for each dimension
    let combinations = generateNeighborCoordinateCombinations(dimensions.length);

    combinations.forEach((combination) => {
        let neighbor = dimensions.slice();

        combination.forEach((value, index) => {
            neighbor[index] = parseInt(neighbor[index]) + value;
        });

        neighbors.push(neighbor.join(','));
    });

    return neighbors;
}

function generateNeighborCoordinateCombinations(dimensions) {
    let combinations = [];

    for (let i = 0; i < Math.pow(3, dimensions); i++) {
        let combination = [];

        for (let j = 0; j < dimensions; j++) {
            combination.push((Math.floor(i / Math.pow(3, j)) % 3) - 1);
        }

        // Filter out the combination that results in the original point (all zeros)
        if (!combination.every((value) => value === 0)) {
            combinations.push(combination);
        }
    }

    return combinations;
}
