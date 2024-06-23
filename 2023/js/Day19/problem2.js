module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const EOL = require('os').EOL;
    const START = 'in';
    const [ACCEPTED, REJECTED] = ['A', 'R'];

    let workflows = new Map();
    const DATA = rawData.split(EOL + EOL);

    DATA[0].split(EOL).forEach((line) => {
        line = line.replace('{', ' ');
        line = line.replace('}', '');
        let [key, rules] = line.split(' ');

        rules = rules.split(',');
        rules = rules.map((rule, index) => {
            if (index === rules.length - 1) {
                return { destination: rule };
            }

            let [evaluation, destination] = rule.split(':');
            let [_, category, symbol, number] = evaluation.match(/(\w+)([<>])(\d+)/);
            number = parseInt(number);

            return {
                category,
                symbol,
                number,
                destination,
            };
        });

        workflows.set(key, rules);
    });

    let validRanges = [];
    function recurse(key, x, m, a, s) {
        if (x[0] > x[1] || m[0] > m[1] || a[0] > a[1] || s[0] > s[1]) {
            return;
        }
        if (key === ACCEPTED) {
            validRanges.push([x.slice(), m.slice(), a.slice(), s.slice()]);
            return;
        } else if (key === REJECTED) {
            return;
        }

        let rules = workflows.get(key);

        let altX = x.slice();
        let altM = m.slice();
        let altA = a.slice();
        let altS = s.slice();

        rules.forEach((rule) => {
            let newX = altX.slice();
            let newM = altM.slice();
            let newA = altA.slice();
            let newS = altS.slice();
            if (newX[0] > newX[1] || newM[0] > newM[1] || newA[0] > newA[1] || newS[0] > newS[1]) {
                return;
            }

            if (!rule.category) {
                recurse(rule.destination, altX, altM, altA, altS);
            } else {
                if (rule.symbol === '<') {
                    if (rule.category === 'x') {
                        if (newX[1] >= rule.number) {
                            newX[1] = rule.number - 1;
                        }
                        altX[0] = Math.max(rule.number, altX[0]);
                    } else if (rule.category === 'm') {
                        if (newM[1] >= rule.number) {
                            newM[1] = rule.number - 1;
                        }
                        altM[0] = Math.max(rule.number, altM[0]);
                    } else if (rule.category === 'a') {
                        if (newA[1] >= rule.number) {
                            newA[1] = rule.number - 1;
                        }
                        altA[0] = Math.max(rule.number, altA[0]);
                    } else if (rule.category === 's') {
                        if (newS[1] >= rule.number) {
                            newS[1] = rule.number - 1;
                        }
                        altS[0] = Math.max(rule.number, altS[0]);
                    }
                } else if (rule.symbol === '>') {
                    if (rule.category === 'x') {
                        if (newX[0] <= rule.number) {
                            newX[0] = rule.number + 1;
                        }
                        altX[1] = Math.min(rule.number, altX[1]);
                    } else if (rule.category === 'm') {
                        if (newM[0] <= rule.number) {
                            newM[0] = rule.number + 1;
                        }
                        altM[1] = Math.min(rule.number, altM[1]);
                    } else if (rule.category === 'a') {
                        if (newA[0] <= rule.number) {
                            newA[0] = rule.number + 1;
                        }
                        altA[1] = Math.min(rule.number, altA[1]);
                    } else if (rule.category === 's') {
                        if (newS[0] <= rule.number) {
                            newS[0] = rule.number + 1;
                        }
                        altS[1] = Math.min(rule.number, altS[1]);
                    }
                }

                if (rule.category === 'x') {
                    recurse(rule.destination, newX, altM, altA, altS);
                } else if (rule.category === 'm') {
                    recurse(rule.destination, altX, newM, altA, altS);
                } else if (rule.category === 'a') {
                    recurse(rule.destination, altX, altM, newA, altS);
                } else if (rule.category === 's') {
                    recurse(rule.destination, altX, altM, altA, newS);
                }
            }
        });
        return;
    }

    recurse(START, [1, 4000], [1, 4000], [1, 4000], [1, 4000]);

    const answer = validRanges.reduce((lineTotal, lineCurr) => {
        if (
            lineCurr[0][0] > lineCurr[0][1] ||
            lineCurr[1][0] > lineCurr[1][1] ||
            lineCurr[2][0] > lineCurr[2][1] ||
            lineCurr[3][0] > lineCurr[3][1]
        ) {
            return lineTotal;
        }

        return (
            lineTotal +
            (lineCurr[0][1] - lineCurr[0][0] + 1) *
                (lineCurr[1][1] - lineCurr[1][0] + 1) *
                (lineCurr[2][1] - lineCurr[2][0] + 1) *
                (lineCurr[3][1] - lineCurr[3][0] + 1)
        );
    }, 0);
    return { value: answer };
}
