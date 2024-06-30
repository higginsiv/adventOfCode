const { floor } = Math;
export default function solve({ lines, rawData }) {
    const answer = lines.map(Number).reduce((total, curr) => {
        return total + floor(curr / 3) - 2;
    }, 0);
    return { value: answer };
}
