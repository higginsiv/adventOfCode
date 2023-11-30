console.time();
const fr = require('../../../tools/fileReader');
const { EOL } = require('os');

const [year, day, part] = ['2015', '19', '1'];
const data = fr.getInput(year, day, EOL + EOL);

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
console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();
