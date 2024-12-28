export default function solve({ lines, rawData }) {
    const answer = rawData.match(/(-){0,1}\d{1,}/g).reduce((total, curr) => {
        return (total += parseInt(curr));
    }, 0);
    return { value: answer };
}
