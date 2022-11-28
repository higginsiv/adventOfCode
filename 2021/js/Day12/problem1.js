const fr = require('../../../tools/fileReader');
const data = fr.getInput("2021",12, '\n', 'input.txt').map(x => x.split('-'));

// create point map
let points = new Map();
data.forEach(segment => {
	segment.forEach((point, index, seg) => {
		if (!points.get(point)) {
			points.set(point, {
				'opts': []
			});
		}
		let x = points.get(point);
		// push the other point of this segment
		x.opts.push(seg[(index * -1) + 1]);
	});
});

let paths = 0;
traverse('start');

function traverse(point, visited) {
	if (visited == null) {
		visited = ['start'];
	} else {
		visited.push(point);
	}

	if (point === 'end') {
		paths++;
		return;
	}

	points.get(point).opts.forEach(x => {
		if (!visited.includes(x) || x !== x.toLowerCase()) {
			traverse(x, [...visited]);
		}
	});
}

console.log('Day 12 Puzzle 1: ' + paths);