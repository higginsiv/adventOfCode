const fr = require('../../../tools/fileReader');
const year = "2022";
const day = "03";
const data = fr.getInput(year,day);

let priority = 0;
for (let i = 0; i < data.length; i += 3) {
    let badgeType = data[i].split('').find(item => {
        return data[i + 1].indexOf(item) !== -1 && data[i + 2].indexOf(item) !== -1
     });
    
    let offset = badgeType == badgeType.toUpperCase() ? 38 : 96;
    priority += (badgeType.charCodeAt(0) - offset);
}

console.log('Year ' + year + ' Day ' + day + ' Puzzle 2: ' + priority);