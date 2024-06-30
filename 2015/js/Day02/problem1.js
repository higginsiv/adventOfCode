export default function solve({ lines, rawData }) {
    const answer = lines
        .map((x) => {
            return x.split('x').map((v) => parseInt(v));
        })
        .reduce((total, curr) => {
            let areas = [curr[0] * curr[1], curr[0] * curr[2], curr[1] * curr[2]].sort(
                (a, b) => a - b,
            );
            return total + 3 * areas[0] + 2 * areas[1] + 2 * areas[2];
        }, 0);
    return { value: answer };
}
