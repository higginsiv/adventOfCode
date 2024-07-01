export default function solve({ lines, rawData }) {
    const answer = rawData.split('').reduce((total, curr) => {
        return curr === '(' ? total + 1 : total - 1;
    }, 0);
    return { value: answer };
}
