module.exports = { solve: solve };
const { EOL } = require('os');

function solve({ lines, rawData }) {
    const data = rawData.split(EOL + EOL);

    const MOLECULE = data[1];
    let replacements = new Map();

    data[0].split(EOL).forEach((x) => {
        x = x.split(' => ');
        if (replacements.get(x[0]) == null) {
            replacements.set(x[0], []);
        }
        replacements.get(x[0]).push(x[1]);
    });

    let newnew = new Set();

    replacements.forEach((value, key) => {
        value.forEach((replacement) => {
            let lastIndexOf = -Infinity;

            while (true) {
                let index = MOLECULE.indexOf(key, lastIndexOf + 1);
                if (index !== -1 && index > lastIndexOf) {
                    let firstPart = MOLECULE.substring(0, index);
                    let secondPart = MOLECULE.substring(index);
                    secondPart = secondPart.replace(key, replacement);

                    let newMolecule = firstPart + secondPart;
                    newnew.add(newMolecule);

                    lastIndexOf = index;
                } else {
                    break;
                }
            }
        });
    });

    let answer = newnew.size;

    return { value: answer };
}
