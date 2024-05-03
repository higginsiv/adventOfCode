module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const data = rawData.split(',').map((x) => parseInt(x));

    const MAX = 2020;

    class Digit {
        saidAt;
        amount;
        constructor(saidAt, amount) {
            this.saidAt = saidAt;
            this.amount = amount;
        }
    }

    let digits = new Map();

    data.forEach((num, index) => {
        digits.set(num, new Digit([index], 1));
    });

    let lastSaid = data[data.length - 1];

    for (let i = data.length; i < MAX; i++) {
        let next;
        let nextDigit;
        let lastSaidDigit = digits.get(lastSaid);

        if (lastSaidDigit.amount === 1) {
            next = 0;
        } else {
            next = lastSaidDigit.saidAt[1] - lastSaidDigit.saidAt[0];
        }

        nextDigit = digits.get(next);
        if (nextDigit != null) {
            nextDigit.amount++;
            nextDigit.saidAt.push(i);
            if (nextDigit.saidAt.length > 2) {
                nextDigit.saidAt.shift();
            }
        } else {
            digits.set(next, new Digit([i], 1));
        }

        lastSaid = next;
    }

    const answer = lastSaid;
    return { value: answer };
}
