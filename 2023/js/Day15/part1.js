export default function solve({ lines, rawData }) {
    const ANSWER = rawData
        .split(',')
        .map((x) => x.split(''))
        .reduce((total, curr) => {
            return (
                total +
                curr.reduce((subTotal, letter) => {
                    return ((subTotal + letter.charCodeAt(0)) * 17) % 256;
                }, 0)
            );
        }, 0);
    return { value: ANSWER };
}
