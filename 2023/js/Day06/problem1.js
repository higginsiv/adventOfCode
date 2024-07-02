export default function solve({ lines, rawData }) {
    const { floor, sqrt } = Math;
    const [TIMES, DISTANCES] = lines.map((x) => x.match(/\d+/g).map((x) => parseInt(x)));

    const answer = TIMES.reduce((total, curr, index) => {
        const TIME = curr;
        const DISTANCE = DISTANCES[index];
        const x1 = (TIME + sqrt(TIME * TIME - 4 * DISTANCE)) / 2;
        const x2 = (TIME - sqrt(TIME * TIME - 4 * DISTANCE)) / 2;
        const wins = floor(x1) - floor(x2);

        return total * wins;
    }, 1);
    return { value: answer };
}
