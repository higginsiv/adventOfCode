export default function solve({ lines, rawData }) {
    const { floor, sqrt } = Math;
    const [TIME, DISTANCE] = lines.map((x) => {
        x = x.replace(/\s+/g, '');
        return x.match(/\d+/g).map((x) => parseInt(x))[0];
    });

    const x1 = (TIME + sqrt(TIME * TIME - 4 * DISTANCE)) / 2;
    const x2 = (TIME - sqrt(TIME * TIME - 4 * DISTANCE)) / 2;
    const answer = floor(x1) - floor(x2);
    return { value: answer };
}
