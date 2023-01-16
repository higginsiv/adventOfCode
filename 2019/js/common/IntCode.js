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
const OP_9 = 9;

const OP_99 = 99;

const [POSITION, IMMEDIATE, RELATIVE] = [0, 1, 2];
const MODES = [POSITION, IMMEDIATE, RELATIVE];
const DEFAULT_MODE = POSITION;

const DEFAULT_MEMORY_VALUE = 0n;

const EVENT_OUTPUT = 'output';

async function runAsync(memory, pointer, input, out, relative = 0n, eventEmitter) {
	return new Promise((resolve, reject) => {
		let result = run(memory, pointer, input, out, relative, eventEmitter);
		resolve(result);
	});
}

async function run(memory, pointer = 0n, input, out = [], relative = 0n, eventEmitter) {
	let opCode;
	while (opCode !== 99) {
		let opCodeWhole = String(getValueAtLocation(pointer, memory));
		opCode = parseInt(opCodeWhole.substring(opCodeWhole.length - 2));
		// console.log('op: ' + opCodeWhole)

		let parameterModes = opCodeWhole.substring(0, opCodeWhole.length - 2).split('').reverse().map(x => {
			if (x === "") {
				return DEFAULT_MODE
			}
			return parseInt(x)
		});

		// console.log(parameterModes)
		let pointerMod;
		switch (opCode) {
			case OP_1:
				add(pointer + 1n, pointer + 2n, pointer + 3n, memory, parameterModes, relative);
				pointerMod = 4n;
				break;
			case OP_2:
				mult(pointer + 1n, pointer + 2n, pointer + 3n, memory, parameterModes, relative);
				pointerMod = 4n;
				break;
			case OP_3:
				await saveInput(pointer + 1n, memory, input, null, parameterModes, relative)
				pointerMod = 2n;
				break;
			case OP_4:
				output(pointer + 1n, memory, out, parameterModes, relative, eventEmitter)
				pointerMod = 2n;
				break;
			case OP_5:
				pointerMod = BigInt(jumpIfTrue(pointer + 1n, pointer + 2n, memory, pointer, parameterModes, relative))
				break;
			case OP_6:
				pointerMod = BigInt(jumpIfFalse(pointer + 1n, pointer + 2n, memory, pointer, parameterModes, relative))
				break;
			case OP_7:
				lessThan(pointer + 1n, pointer + 2n, pointer + 3n, memory, parameterModes, relative);
				pointerMod = 4n;
				break;
			case OP_8:
				equals(pointer + 1n, pointer + 2n, pointer + 3n, memory, parameterModes, relative);
				pointerMod = 4n;
				break;
			case OP_9:
				// console.log(opCodeWhole)
				// console.log('pre-r: ' + relative)
				relative += getRelativeModifier(pointer + 1n, memory, parameterModes, relative)
				// console.log('r: ' + relative)
				pointerMod = 2n;
				break;
			case OP_99:
				break;
			default:
				console.log('panic ' + pointer)
				console.log(out)
				process.exit()
				break;
		}

		if (opCode !== OP_99) {
			pointer += pointerMod;
		}
	}

	return out;
}

function getParameterValue(position, modes, memory, relative, illegalModes = []) {
	let mode;
	if (modes.length === 0) {
		mode = DEFAULT_MODE;
	} else {
		mode = modes.shift();
	}

	if (illegalModes.includes(mode)) {
		mode = DEFAULT_MODE
	}

	switch (mode) {
		case POSITION:
			return getValueAtLocation(position, memory);
		case IMMEDIATE:
			return position
		case RELATIVE:
			return getValueAtLocation(position, memory) + relative;
		default:
			console.log('Invalid Mode');
	}
}

function add(pos1, pos2, dest, memory, modes, relative) {
	pos1 = getParameterValue(pos1, modes, memory, relative);
	pos2 = getParameterValue(pos2, modes, memory, relative);
	dest = getParameterValue(dest, modes, memory, relative, [IMMEDIATE]); //getValueAtLocation(dest, memory);

	memory[dest] = getValueAtLocation(pos1, memory) + getValueAtLocation(pos2, memory);
}

function mult(pos1, pos2, dest, memory, modes, relative) {
	// console.log(modes)
	pos1 = getParameterValue(pos1, modes, memory, relative);
	pos2 = getParameterValue(pos2, modes, memory, relative);
	dest = getParameterValue(dest, modes, memory, relative, [IMMEDIATE]); //

	memory[dest] = getValueAtLocation(pos1, memory) * getValueAtLocation(pos2, memory);
}

async function saveInput(pos, memory, input, parentResolve, modes, relative) {
	if (input.length === 0) {
		await new Promise((resolve, reject) => {
			setTimeout(saveInput, 1, pos, memory, input, resolve, modes, relative);
		})
	} else {
		// console.log(pos)
		pos = getParameterValue(pos, modes, memory, relative, [IMMEDIATE])
		// console.log(input)
		// console.log(relative)
		// console.log(pos);
		// console.log(getValueAtLocation(pos, memory))
		memory[pos] = input.shift();
		if (parentResolve != null) {
			parentResolve();
		}
	}
}

function output(pos, memory, out, modes, relative, eventEmitter) {
	// console.log('prepos: ' + pos)
	pos = getParameterValue(pos, modes, memory, relative)
	// console.log('pos: ' + pos)
	// console.log(getValueAtLocation(pos, memory))
	out.push(getValueAtLocation(pos, memory))
	if (eventEmitter) {
		eventEmitter.emit(EVENT_OUTPUT);
	}
}

function jumpIfTrue(pos1, pos2, memory, pointer, modes, relative) {
	pos1 = getParameterValue(pos1, modes, memory, relative);
	pos2 = getParameterValue(pos2, modes, memory, relative);
	if (getValueAtLocation(pos1, memory) !== 0n) {
		return getValueAtLocation(pos2, memory) - pointer;
	} else {
		return 3n;
	}
}

function jumpIfFalse(pos1, pos2, memory, pointer, modes, relative) {
	pos1 = getParameterValue(pos1, modes, memory, relative);
	pos2 = getParameterValue(pos2, modes, memory, relative);
	if (getValueAtLocation(pos1, memory) === 0n) {
		return getValueAtLocation(pos2, memory) - BigInt(pointer);
	} else {
		return 3n;
	}
}

function lessThan(pos1, pos2, pos3, memory, modes, relative) {
	pos1 = getParameterValue(pos1, modes, memory, relative);
	pos2 = getParameterValue(pos2, modes, memory, relative);
	pos3 = getParameterValue(pos3, modes, memory, relative, [IMMEDIATE]); //

	let writeVal = getValueAtLocation(pos1, memory) < getValueAtLocation(pos2, memory) ? 1n : 0n;
	memory[pos3] = writeVal;
}

function equals(pos1, pos2, pos3, memory, modes, relative) {
	pos1 = getParameterValue(pos1, modes, memory, relative);
	pos2 = getParameterValue(pos2, modes, memory, relative);
	pos3 = getParameterValue(pos3, modes, memory, relative, [IMMEDIATE]); //

	let writeVal = getValueAtLocation(pos1, memory) === getValueAtLocation(pos2, memory) ? 1n : 0n;
	memory[pos3] = writeVal;
}

function getRelativeModifier(pos1, memory, modes, relative) {
	// console.log('pre-pos-gr: ' + pos1 + ' relative: ' + relative)
	pos1 = getParameterValue(pos1, modes, memory, relative);
	// console.log('pos-gr: ' + pos1 + ' val: ' + getValueAtLocation(pos1, memory))
	return getValueAtLocation(pos1, memory);
}

function getValueAtLocation(pos, memory) {
	let value = memory[pos];
	return value ?? DEFAULT_MEMORY_VALUE;
}