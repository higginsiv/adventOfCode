export default function solve({ lines, rawData }) {
    const answer = lines.map(Number).reduce((total, curr) => {
        return total + calcFuel(curr);
    }, 0);

    function calcFuel(mass) {
        let fuel = Math.floor(mass / 3) - 2;
        if (fuel <= 0) {
            return 0;
        }
        return fuel + calcFuel(fuel);
    }
    return { value: answer };
}
