module.exports = {
    run: run
}

const OP_1 = 1;
const OP_2 = 2;
const OP_99 = 99;

function run(memory, pointer = 0) {
	let opCode;
	while (opCode !== 99) {
		opCode = memory[pointer];
		switch (opCode) {
			case OP_1:
				add(pointer + 1, pointer + 2, pointer + 3, memory);
				break;
			case OP_2:
				mult(pointer + 1, pointer + 2, pointer + 3, memory);
				break;
			case OP_99:
				break;
			default:
				console.log('panic' + pointer)
				break;
		}
		pointer += 4;
	}
	return memory[0];
}

function add(pos1, pos2, dest, data) {
	data[data[dest]] = data[data[pos1]] + data[data[pos2]];
}

function mult(pos1, pos2, dest, data) {
	data[data[dest]] = data[data[pos1]] * data[data[pos2]];
}