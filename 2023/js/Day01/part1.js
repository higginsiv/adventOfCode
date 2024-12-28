export default function solve({ lines, rawData }) {
    const answer = lines.reduce((total, curr) => {
        let digits = [...curr.matchAll(/\d/g)];
        return total + parseInt(digits[0][0] + digits[digits.length - 1][0]);
    }, 0);
    return { value: answer };
}
