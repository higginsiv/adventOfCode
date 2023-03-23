console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ["2015","01","1"];
const answer = fr.getInput(year,day, '').reduce((total, curr) => {
	return curr === '(' ? total + 1 : total - 1;
}, 0);

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();