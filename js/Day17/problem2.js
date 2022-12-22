const fr = require('../tools/fileReader');
const data = fr.getInput(17, ' ', 'testInput.txt')
	.splice(2)
	.map(x => {
		const ranges = x.split('=').splice(1).map(y => y.split('..'));
		return ranges[0];
	});

const xMin = parseInt(data[0][0]);
const xMax = parseInt(data[0][1]);
const yMin = parseInt(data[1][0]);
const yMax = parseInt(data[1][1]);

const startX = 0;
const startY = 0;

let acceptedXVel = [];
let acceptedSteps = [];
let acceptedYVel = [];

for (let xVelStart = 0; xVelStart < xMax; xVelStart++) {
	let xVel = xVelStart;
	let currX = startX;
	let numSteps = 0;
	while (currX < xMax) {

		if (currX >= xMin && currX <= xMax) {
			acceptedXVel.push(
				{
					'xVel': xVelStart,
					'steps': numSteps
				}
			);
		}

		if (xVel === 0) {
			break;
		}

		numSteps++;
		currX += xVel;
		if (xVel > 0) {
			xVel--;
		}
	}
}

// TODO 100 is arbitrary and not conclusive on all inputs
for (let yVelStart = yMin; yVelStart < 100; yVelStart++) {
	let yVel = yVelStart;
	let currY = startY;
	let numSteps = 0;
	let cont = true;
	while (cont) {
		numSteps++;

		currY += yVel;

		if (currY >= yMin && currY <= yMax) {
			acceptedYVel.push(
				{
					'yVel': yVelStart,
					'steps': numSteps
				}
			);
		}
		yVel--;

		if (currY <= yMin) {
			break;
		}
	}
}

totalPoints = [];
for (let i = 0; i < acceptedXVel.length; i++) {
	const xVel = acceptedXVel[i].xVel;
	const xSteps = acceptedXVel[i].steps;
	for (let j = 0; j < acceptedYVel.length; j++) {
		const yVel = acceptedYVel[j].yVel;
		const ySteps = acceptedYVel[j].steps;
		if (ySteps >= xSteps) {
			console.log(xVel + ' ' + yVel);
			if (!totalPoints.includes(xVel + ' ' + yVel)) {
				totalPoints.push(xVel + ' ' + yVel);
			}
		}
	}
}

console.log('Day 17 Puzzle 2: ' + totalPoints.length);