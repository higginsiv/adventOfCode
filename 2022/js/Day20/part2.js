export default function solve({ lines, rawData }) {
    const KEY = 811589153;

    class Point {
        value;
        index;
        constructor(value, index) {
            this.value = value;
            this.index = index;
        }
    }

    let data = lines.map((x, index) => new Point(parseInt(x) * KEY, index));

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < data.length; j++) {
            for (let k = 0; k < data.length; k++) {
                if (data[k].index === j) {
                    let el = data.slice(k, k + 1)[0];
                    data.splice(k, 1);
                    data.splice((k + el.value) % data.length, 0, el);
                    break;
                }
            }
        }
    }

    let zeroIndex = data.reduce((ans, x, index) => {
        if (x.value === 0) {
            return index - 1;
        } else {
            return ans;
        }
    }, 0);

    const stack = data[((zeroIndex + 1000) % data.length) + 1].value;
    const dubs = data[((zeroIndex + 2000) % data.length) + 1].value;
    const andre = data[((zeroIndex + 3000) % data.length) + 1].value;

    const answer = stack + dubs + andre;
    return { value: answer };
}
