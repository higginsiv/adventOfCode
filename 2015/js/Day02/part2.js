export default function solve({ lines, rawData }) {
    const answer = lines
        .map((x) => {
            return x.split('x').map((v) => parseInt(v));
        })
        .reduce((total, curr) => {
            let perimeters = [
                2 * curr[0] + 2 * curr[1],
                2 * curr[0] + 2 * curr[2],
                2 * curr[1] + 2 * curr[2],
            ].sort((a, b) => a - b);
            return total + perimeters[0] + curr[0] * curr[1] * curr[2];
        }, 0);
    return { value: answer };
}
