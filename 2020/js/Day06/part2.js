import { EOL } from 'os';
export default function solve({ lines, rawData }) {
    const data = rawData.split(EOL + EOL).map((x) => x.split(EOL).map((y) => y.split('')));

    const answer = data.reduce((total, curr) => {
        let groupYesses = curr.reduce((allYes, passenger) => {
            let ret = [];
            allYes.forEach((question) => {
                if (passenger.includes(question)) {
                    ret.push(question);
                }
            });
            return ret;
        });
        return total + groupYesses.length;
    }, 0);
    return { value: answer };
}
