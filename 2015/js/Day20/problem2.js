export default function solve({ lines, rawData }) {
    const { sqrt } = Math;
    const GOAL = parseInt(rawData);

    let house = 1;

    while (true) {
        let factors = getFactors(house).filter((factor) => house / factor <= 50);
        let sum = 11 * factors.reduce((total, curr) => total + curr, 0);
        if (sum >= GOAL) {
            break;
        }
        house++;
    }

    function getFactors(num) {
        let factors = [];
        for (let i = 1; i <= sqrt(num); i++) {
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

    return { value: answer };
}
