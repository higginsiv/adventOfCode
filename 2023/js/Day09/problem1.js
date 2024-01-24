const fr = require('../../../tools/fileReader');
const [YEAR, DAY, PART] = ['2023', '09', '1'];
const DATA = fr
    .getInput(YEAR, DAY)
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
            queue[queue.length - 1].push(previous.pop() + values.pop());
        }

        return total + queue.pop().pop();
    }, 0);

let answer = DATA;
console.log(`Year ${YEAR} Day ${DAY} Puzzle ${PART}: ${answer}`);
