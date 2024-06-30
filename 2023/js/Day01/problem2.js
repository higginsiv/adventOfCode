export default function solve({ lines, rawData }) {
    const DIGITS = new Map([
        ['one', 1],
        ['two', 2],
        ['three', 3],
        ['four', 4],
        ['five', 5],
        ['six', 6],
        ['seven', 7],
        ['eight', 8],
        ['nine', 9],
        ['eno', 1],
        ['owt', 2],
        ['eerht', 3],
        ['ruof', 4],
        ['evif', 5],
        ['xis', 6],
        ['neves', 7],
        ['thgie', 8],
        ['enin', 9],
    ]);

    const regex = new RegExp(/(\d|one|two|three|four|five|six|seven|eight|nine)/g);
    const backwardsRegex = new RegExp(/(\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/g);

    const answer = lines.reduce((total, curr) => {
        let backwardsCurr = curr.split('').reverse().join('');

        let digit1Raw = curr.match(regex)[0];
        let digit1 = DIGITS.get(digit1Raw) == null ? digit1Raw : DIGITS.get(digit1Raw);
        let lastDigitRaw = backwardsCurr.match(backwardsRegex)[0];
        let lastDigit = DIGITS.get(lastDigitRaw) == null ? lastDigitRaw : DIGITS.get(lastDigitRaw);

        return total + parseInt(`${digit1}${lastDigit}`);
    }, 0);
    return { value: answer };
}
