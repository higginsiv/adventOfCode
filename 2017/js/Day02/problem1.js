export default function solve({ lines, rawData }) {
    let answer = lines
        .map((line) => {
            return line
                .match(/\d+/g)
                .map((value) => parseInt(value))
                .sort((a, b) => a - b);
        })
        .reduce((sum, curr) => {
            return sum + (curr[curr.length - 1] - curr[0]);
        }, 0);

    return { value: answer };
}
