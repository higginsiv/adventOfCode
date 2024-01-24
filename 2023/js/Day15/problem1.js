const fr = require('../../../tools/fileReader');
const [YEAR, DAY, PART] = ['2023', '15', '1'];
const ANSWER = fr
    .getInput(YEAR, DAY, ',')
    .map((x) => x.split(''))
    .reduce((total, curr) => {
        return (
            total +
            curr.reduce((subTotal, letter) => {
                return ((subTotal + letter.charCodeAt(0)) * 17) % 256;
            }, 0)
        );
    }, 0);

console.log(`Year ${YEAR} Day ${DAY} Puzzle ${PART}: ${ANSWER}`);
