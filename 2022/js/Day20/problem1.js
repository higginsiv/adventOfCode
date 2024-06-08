module.exports = { solve: solve };

function solve({ lines, rawData }) {
    class Point {
        value;
        index;
        visited = false;
        constructor(value, index) {
            this.value = value;
            this.index = index + value;
        }
    }

    let data = lines.map((x, index) => new Point(parseInt(x), index));

    let i = 0;
    while (i < data.length) {
        if (data[i].visited) {
            i++;
        } else {
            let el = data.slice(i, i + 1)[0];
            el.visited = true;
            data.splice(i, 1);
            data.splice((i + el.value) % data.length, 0, el);
            i = 0;
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
