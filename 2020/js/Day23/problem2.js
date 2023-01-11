console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ["2020","23","2"];
const MAX = 9;
const MOVES = 10000000;

class Cup {
    label;
    previous;
    next;
    constructor(label, previous, next) {
        this.label = label;
        this.previous = previous;
        this.next = next;
    }
}

let labelToCup = new Map();
let data = fr.getInput(year,day, '').map(x => parseInt(x));
let big = [...Array(MAX + 1).keys()]
big.splice(0, data.length);
data = data.concat(big);

// TODO work on building Cups and adding them to map
data.forEach((x, index) => {
    let previousIndex = index - 1 < 0 ? data.length - 1 : index - 1;
    let nextIndex = index + 1 >= data.length ? 0 : index + 1;
    let c = new Cup(x, labelToCup.get(nextIndex))
    labelToCup.set(x, c);
})

let currCup = labelToCup.get(data[0]);
for (let i = 0; i < MOVES; i++) {
    let destination;
    let invalidLabels = [];
    let startOfTrio = currCup.next;
    invalidLabels.push(startOfTrio.label, startOfTrio.next.label, startOfTrio.next.next.label);
    destination = getDestinationCup(currCup.label - 1, invalidLabels);

    // set next of current
    let cupAfterTrio = currCup.next.next.next.next;
    currCup.next = cupAfterTrio;
    // cupAfterTrio.previous = currCup;
    // make start of trio point back to destination cup
    // startOfTrio.previous = destination;
    // make end of trio point to cup formerly after destination
    startOfTrio.next.next.next = destination.next;
    // make cup formerly after destination point back to end of trio
    // destination.next.previous = startOfTrio.next.next
    // make trio follow destination cup
    destination.next = startOfTrio;
}

function getDestinationCup(label, invalidLabels) {
    let destinationCup = null;
    while (destinationCup == null) {
        label--;
        if (label === 0) {
            label = MAX
        }
        if (!invalidLabels.includes(label)) {
            destinationCup = labelToCup.get(label);
        }
    }
    return destinationCup;
}
let currIndex = 0;
for (let i = 0; i < 20; i++) {
    if (i % 100000 === 0) {
        console.log(i)
    }
    printCups(data)
    let curr = data[currIndex];
    let removed = data.splice(currIndex + 1, 3);

    let index = -1;
    let cupToFind = curr;
    while (index === -1) {
        cupToFind -= 1;
        if (cupToFind === 0) {
            cupToFind = MAX;
        }
        index = data.indexOf(cupToFind);
    }

    data.splice(index + 1, 0, ...removed)

    currIndex = data.indexOf(curr) + 1;
    if (currIndex >= data.length) {
        currIndex = 0
    }
    let nextCup = data[currIndex];

    if (data.indexOf(nextCup) > data.length - 5) {
        while (data.indexOf(nextCup) !== 0) {
            data.unshift(data.pop())
        }
        currIndex = 0;
    }

}

// while (data[0] !== 1) {
//     data.push(data.shift());
// }
function printCups(grid, numOnSide = 9) {
    let string = ''
    for (let i = 0; i < numOnSide; i++) {
        string += (grid[i] + ',')
    }
    // string += '...'
    // for (let i = numOnSide; i > 0; i--) {
    //     string += (grid[grid.length - i] + ',')
    // }
    console.log(string)
}
let answer = data[data.indexOf(1) + 1] * data[data.indexOf(1) + 2];
console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();