// TODO: this solution has a lot of unneeded junk in it and is lucky based on input
const fr = require('../tools/fileReader');
const data = fr.getInput(17, ' ', 'input.txt')
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

for (let xVelStart = 0; xVelStart < xMax; xVelStart++) {
	let xVel = xVelStart;
	let currX = startX;
	let numSteps = 0;
	while (currX < xMax) {
		numSteps++;
		if (currX >= xMin && currX <= xMax) {
			acceptedXVel.push(
				{
					'xVel': xVelStart,
					'steps': numSteps
				}
			);

			if (!acceptedSteps.includes(numSteps)) {
				acceptedSteps.push(numSteps);
			}
		}

		// TODO can't do this because it could be dropping straight down and eventually land in the box
		if (xVel === 0) {
			break;
		}

		currX += xVel;
		if (xVel > 0) {
			xVel--;
		}
	}
}

acceptedSteps.sort((a, b) => a - b);

let highY = -Infinity;

for (let yVelStart = 0; yVelStart < 100; yVelStart++) {
	let yVel = yVelStart;
	let currY = startY;
	let numSteps = 0;
	let cont = true;
	let localHighY = -Infinity;
	while (cont) {
		numSteps++;

		currY += yVel;

		if (currY > localHighY) {
			localHighY = currY;
		}

		if (currY >= yMin && currY <= yMax) {
			if (localHighY > highY) {
				highY = localHighY;
			}
		}
		yVel--;

		if (currY <= yMin) {
			break;
		}
	}
}

console.log('Day 17 Puzzle 1: ' + highY);