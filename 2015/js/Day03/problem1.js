console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ["2015","03","1"];

const [NORTH, EAST, SOUTH, WEST] = ['^', '>', 'v', '<'];

let curX = 0;
let curY = 0;
let locations = new Map();
locations.set(makeKey(curX, curY), 1);

fr.getInput(year,day,'').forEach(x => {
	switch (x) {
		case NORTH:
			curY++;
			break;
		case EAST:
			curX++;
			break;
		case SOUTH:
			curY--;
			break;
		case WEST:
			curX--;
			break;
		default:
			console.log('f');
	}

	let key = makeKey(curX, curY);
	let presentCount = locations.get(key);
	presentCount = presentCount == null ? 1 : presentCount + 1;
	locations.set(key, presentCount);
})

let answer = locations.size;

function makeKey(x, y) {
	return x + '.' + y;
}
console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();