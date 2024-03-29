console.time();
const fr = require('../../../tools/fileReader');
const [YEAR, DAY, PART] = ['2015', '20', '1'];
const DATA = fr.getInput(YEAR, DAY);

const GOAL = parseInt(DATA[0]);

let house = 1;

while (true) {
    let factors = getFactors(house);
    let sum = 10 * factors.reduce((total, curr) => total + curr, 0);
    if (sum >= GOAL) {
        break;
    }
    house++;
}

function getFactors(num) {
    let factors = [];
    for (let i = 1; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            factors.push(i);
            if (num / i !== i) {
                // check if the pair factor has already been included
                factors.push(num / i);
            }
        }
    }
    return factors.sort((a, b) => a - b); // sort factors in ascending order
}
let answer = house;
console.log(`Year ${YEAR} Day ${DAY} Puzzle ${PART}: ${answer}`);
console.timeEnd();
