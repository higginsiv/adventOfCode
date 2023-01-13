module.exports = {
    run: run,
	runAsync: runAsync
}

const OP_1 = 1;
const OP_2 = 2;
const OP_3 = 3;
const OP_4 = 4;
const OP_5 = 5;
const OP_6 = 6;
const OP_7 = 7;
const OP_8 = 8;

const OP_99 = 99;

const [POSITION, IMMEDIATE] = [0, 1];
const MODES = [POSITION, IMMEDIATE];
const DEFAULT_MODE = POSITION;

async function runAsync(memory, pointer = 0, input) {
	return run(memory, pointer, input);
}

function run(memory, pointer = 0, input, out = []) {
	// console.log('i')
	// console.log(input)
	// console.log('o')
	// console.log(out)
	let opCode;
	while (opCode !== 99) {
		let opCodeWhole = String(memory[pointer]);
		opCode = parseInt(opCodeWhole.substring(opCodeWhole.length - 2));
		let parameterModes = opCodeWhole.substring(0, opCodeWhole.length - 2).split('').reverse().map(x => {
			if (x === "") {
				return DEFAULT_MODE
			}
			return parseInt(x)
		});

		let pointerMod;
		switch (opCode) {
			case OP_1:
				add(pointer + 1, pointer + 2, pointer + 3, memory, parameterModes);
				pointerMod = 4;
				break;
			case OP_2:
				mult(pointer + 1, pointer + 2, pointer + 3, memory, parameterModes);
				pointerMod = 4;
				break;
			case OP_3:
				saveInput(pointer + 1, memory, input)
				pointerMod = 2;
				break;
			case OP_4:
				output(pointer + 1, memory, out)
				pointerMod = 2;
				break;
			case OP_5:
				pointerMod = jumpIfTrue(pointer + 1, pointer + 2, memory, pointer, parameterModes)
				break;
			case OP_6:
				pointerMod = jumpIfFalse(pointer + 1, pointer + 2, memory, pointer, parameterModes)
				break;
			case OP_7:
				lessThan(pointer + 1, pointer + 2, pointer + 3, memory, parameterModes);
				pointerMod = 4;
				break;
			case OP_8:
				equals(pointer + 1, pointer + 2, pointer + 3, memory, parameterModes);
				pointerMod = 4;
				break;
			case OP_99:
				break;
			default:
				console.log('panic ' + pointer)
				exit()
				break;
		}
		pointer += pointerMod;
	}

	return out;
}

function getParameterValue(position, modes, data) {
	let mode;
	if (modes.length === 0) {
		mode = DEFAULT_MODE;
	} else {
		mode = modes.shift();
	}

	switch (mode) {
		case POSITION:
			return data[position];
		case IMMEDIATE:
			return position
		default:
			console.log('fuck');
	}
}

function add(pos1, pos2, dest, data, modes) {
	dest = data[dest];
	pos1 = getParameterValue(pos1, modes, data);
	pos2 = getParameterValue(pos2, modes, data);

	data[dest] = data[pos1] + data[pos2];
}

function mult(pos1, pos2, dest, data, modes) {
	dest = data[dest]
	pos1 = getParameterValue(pos1, modes, data);
	pos2 = getParameterValue(pos2, modes, data);
	data[dest] = data[pos1] * data[pos2];
}

function saveInput(pos, memory, input) {
	while (input.length === 0) {
		console.log('waiting')
	}

	memory[memory[pos]] = input.shift();
}

function output(pos, memory, out) {
	console.log('pushing')
	out.push(memory[memory[pos]])
}

function jumpIfTrue(pos1, pos2, memory, pointer, modes) {
	pos1 = getParameterValue(pos1, modes, memory);
	pos2 = getParameterValue(pos2, modes, memory);
	if (memory[pos1] !== 0) {
		return memory[pos2] - pointer;
	} else {
		return 3;
	}
}

function jumpIfFalse(pos1, pos2, memory, pointer, modes) {
	pos1 = getParameterValue(pos1, modes, memory);
	pos2 = getParameterValue(pos2, modes, memory);
	if (memory[pos1] === 0) {
		return memory[pos2] - pointer;
	} else {
		return 3;
	}
}

function lessThan(pos1, pos2, pos3, memory, modes) {
	pos1 = getParameterValue(pos1, modes, memory);
	pos2 = getParameterValue(pos2, modes, memory);
	let writeVal = memory[pos1] < memory[pos2] ? 1 : 0;
	memory[memory[pos3]] = writeVal;
}

function equals(pos1, pos2, pos3, memory, modes) {
	pos1 = getParameterValue(pos1, modes, memory);
	pos2 = getParameterValue(pos2, modes, memory);
	let writeVal = memory[pos1] === memory[pos2] ? 1 : 0;
	memory[memory[pos3]] = writeVal;
}