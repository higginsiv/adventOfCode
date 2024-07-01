import { EOL } from 'os';
export default function solve({ lines, rawData }) {
    const data = rawData.split(EOL + EOL).map((x) => {
        x = x.replaceAll(EOL, '');
        x = x.split('');
        x = new Set(x);
        return x;
    });

    const answer = data.reduce((total, curr) => {
        return total + curr.size;
    }, 0);
    return { value: answer };
}
