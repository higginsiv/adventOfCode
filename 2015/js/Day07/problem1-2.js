console.time();
const fr = require('../../../tools/fileReader');
const keys = require('../../../tools/keys');

const [year, day, part] = ["2015","07","1"];

let gates = new Map();
let expression = '';
fr.getInput(year,day).map(x => x.split(' -> ')).forEach(x => {
	gates.set(x[1], x[0]);
});

function buildExpression(start) {
	let subs = [start];

	expression = start;
	while (subs.length > 0) {
		let key = subs.shift();
		if (!isNaN(key)) {
			continue;
		}
		// console.log(key);
		let sub = gates.get(key);
		// console.log(sub)
		expression = expression.replaceAll(key, '(' + sub + ')');

		sub = sub.split(' ');

		if (sub.length == 1) {
			if (isNaN(sub[0])) {
				subs.push(sub[0]);
			} 
			else {
				gates.set(key, sub[0]);
			}
		} else if (sub.length == 2) {
			subs.push(sub[1]);
		} else if (sub.length == 3) {
			subs.push(sub[0]);
			subs.push(sub[2]);
		} else {
			console.log('error');
		}
	}
}

buildExpression('a');
console.log(expression)
// if (answer < 0) {
// 	answer += 65536;
// }
// console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();