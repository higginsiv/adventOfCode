const fr = require('../../../tools/fileReader');
const year = "2022";
const day = "03";
const data = fr.getInput(year,day);

let priority = 0;
data.forEach(sack => {
    let [comp1, comp2] = [sack.slice(0, sack.length/2), sack.slice(sack.length/2)];
    let misplacedType = comp1.split('').find(item => {
       return comp2.indexOf(item) !== -1
    });

    let offset = misplacedType == misplacedType.toUpperCase() ? 38 : 96;

    priority += (misplacedType.charCodeAt(0) - offset);
})

console.log('Year ' + year + ' Day ' + day + ' Puzzle 1: ' + priority);