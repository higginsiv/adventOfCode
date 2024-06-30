export default function solve({ lines, rawData }) {
    const [minX, maxX, minY, maxY] = lines.map((x) => {
        x = x.replace('target area: x=', '');
        x = x.replaceAll('..', ' ');
        x = x.replace(',', '');
        x = x.replace('y=', '');
        x = x.split(' ').map((y) => parseInt(y));
        return x;
    })[0];

    const [xStart, yStart] = [0, 0];

    // Idea here is that Y must equal 0 again on the downswing, and the fastest y can
    // be going has to still barely clip the bottom of the valid y box. This probably
    // doesn't work directly for non negative y's but yolo
    let answer = factorialAddition(yStart - minY) - Math.abs(minY);

    /** Idk the math name but imagine a factorial that adds intstead of multiplying */
    function factorialAddition(int) {
        let res = 0;
        while (int > 0) {
            res += int;
            int--;
        }
        return res;
    }
    return { value: answer };
}
