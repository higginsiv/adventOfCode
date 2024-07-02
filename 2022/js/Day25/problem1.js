export default function solve({ lines, rawData }) {
    const { pow, floor } = Math;
    const SNAFU_TO_DEC = new Map([
        ['=', -2],
        ['-', -1],
        ['0', 0],
        ['1', 1],
        ['2', 2],
    ]);

    const DEC_TO_SNAFU = new Map([
        [-2, '='],
        [-1, '-'],
        [0, '0'],
        [1, '1'],
        [2, '2'],
    ]);

    const MAX_DIGIT = 2;
    const BASE = 5;
    const DECIMAL_SUM = lines
        .map((x) => {
            x = x.split('').map((y) => SNAFU_TO_DEC.get(y));
            return x;
        })
        .reduce((sum, curr) => {
            return (
                sum +
                curr.reduce((conversion, digit, index, number) => {
                    return conversion + digit * pow(BASE, number.length - index - 1);
                }, 0)
            );
        }, 0);

    function decToBaseFive(dec, digits) {
        let quotient = floor(dec / BASE);
        let remainder = dec % BASE;
        digits.push(remainder);
        if (quotient === 0) {
            return digits.reverse();
        } else {
            return decToBaseFive(quotient, digits);
        }
    }

    function baseFiveToSnafu(digits) {
        for (let i = digits.length - 1; i >= 0; i--) {
            if (digits[i] > MAX_DIGIT) {
                digits[i - 1]++;
                digits[i] = DEC_TO_SNAFU.get(digits[i] - BASE);
            }
        }
        return digits;
    }

    const answer = baseFiveToSnafu(decToBaseFive(DECIMAL_SUM, [])).reduce((all, curr) => {
        return (all += curr);
    }, '');
    return { value: answer };
}
