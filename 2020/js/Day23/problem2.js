module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const MAX = 1000000;
    const MOVES = 10000000;

    class Cup {
        label;
        next;
        constructor(label, next) {
            this.label = label;
            this.next = next;
        }
    }

    // Get Cups into Linked List
    let labelToCup = new Map();
    let data = rawData.split('').map((x) => parseInt(x));

    let startCup = new Cup(data[0]);
    labelToCup.set(data[0], startCup);

    let currCup = startCup;
    for (let i = MAX; i > data.length; i--) {
        let cup = new Cup(i, currCup);
        labelToCup.set(i, cup);
        currCup = cup;
    }

    for (let i = data.length - 1; i > 0; i--) {
        let cup = new Cup(data[i], currCup);
        labelToCup.set(data[i], cup);
        currCup = cup;
    }

    startCup.next = currCup;

    // Play Game
    currCup = startCup;
    for (let i = 0; i < MOVES; i++) {
        let destination;
        let invalidLabels = [];
        let startOfTrio = currCup.next;

        invalidLabels.push(startOfTrio.label, startOfTrio.next.label, startOfTrio.next.next.label);
        destination = getDestinationCup(currCup.label, invalidLabels);

        // If somehow the destination cup is where we currently are, no need to change anything
        if (destination.next != startOfTrio) {
            // set next of current
            let cupAfterTrio = startOfTrio.next.next.next;
            currCup.next = cupAfterTrio;

            // make end of trio point to cup formerly after destination
            startOfTrio.next.next.next = destination.next;

            // make trio follow destination cup
            destination.next = startOfTrio;
        }

        currCup = currCup.next;
    }

    function getDestinationCup(label, invalidLabels) {
        let destinationCup = null;
        let cupToFind = label;
        while (destinationCup == null) {
            cupToFind--;
            if (cupToFind === 0) {
                cupToFind = MAX;
            }
            if (!invalidLabels.includes(cupToFind)) {
                destinationCup = labelToCup.get(cupToFind);
            }
        }
        return destinationCup;
    }

    const answer = labelToCup.get(1).next.label * labelToCup.get(1).next.next.label;
    return { value: answer };
}
