console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2020', '08', '1'];
const [ACCUMULATE, JUMP, NONE] = ['acc', 'jmp', 'nop'];

class Instruction {
  operation;
  argument;
  executed = false;
  constructor(command) {
    let [operation, argument] = command.split(' ');
    this.operation = operation;
    this.argument = parseInt(argument);
  }
}

const data = fr.getInput(year, day).map((x) => new Instruction(x));

let accumulator = 0;
let index = 0;

while (true) {
  let instruction = data[index];
  if (instruction.executed) {
    break;
  }
  instruction.executed = true;

  switch (instruction.operation) {
    case ACCUMULATE:
      accumulator += instruction.argument;
      index++;
      break;
    case JUMP:
      index += instruction.argument;
      break;
    case NONE:
      index++;
      break;
  }
}

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + accumulator);
console.timeEnd();
