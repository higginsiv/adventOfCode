console.time();
const fr = require('../../../tools/fileReader');
const { EOL } = require('os');

const [year, day, part] = ["2015","19","1"];
const data = fr.getInput(year,day, EOL + EOL);

let molecule = data[1];
let replacements = new Map();

data[0].split(EOL).forEach(x => {
    x = x.split(' => ');
    if (replacements.get(x[0]) == null) {
        replacements.set(x[0], []);
    }
    replacements.get(x[0]).push(x[1]);
})

console.log(molecule)
console.log(replacements)

let newnew = new Set();

replacements.forEach((value, key) => {
    let biggestIndexOf = -Infinity;

    value.forEach(replacement => {
        while (true) {
            let index = molecule.indexOf(key)
            let newMolecule = molecule.replace(key, index)
        }
    })
    
})

let answer;
console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();