console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ["2018","23","1"];
const data = fr.getInput(year,day).map(x => {
	x = x.replace('pos=<','');
	x = x.replace('>, r=', ',');
	x = x.split(',').map(y => parseInt(y));
	return x;
});

data.sort((a, b) => b[3] - a[3]);

const [x, y, z, range] = data.shift();
let inRange = 1;
data.forEach(([locX, locY, locZ, locR]) => {
	if (getDistance(x, locX) + getDistance(y, locY) + getDistance(z, locZ) <= range) {
		inRange++;
	}
})

function getDistance(p1, p2) {
	return Math.abs(p1 - p2);
}

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + inRange);
console.timeEnd();