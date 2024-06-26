export default function solve({ lines, rawData }) {
    const DATA = lines
        .map((x) => {
            return x.match(/-?\d+/g).map((x) => parseInt(x));
        })
        .reduce((total, curr) => {
            let queue = [curr];

            while (queue[queue.length - 1].some((x) => x !== 0)) {
                let newValues = [];
                let values = queue[queue.length - 1];
                for (let i = 1; i < values.length; i++) {
                    newValues.push(values[i] - values[i - 1]);
                }
                queue.push(newValues);
            }

            while (queue.length > 1) {
                let values = queue.pop();
                let previous = queue[queue.length - 1];
                queue[queue.length - 1].unshift(previous[0] - values[0]);
            }

            return total + queue.pop().shift();
        }, 0);

    const answer = DATA;
    return { value: answer };
}
