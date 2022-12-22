const fr = require('../../../tools/fileReader');
const [year, day, part] = ["2022","21","1"];

class Command {
    key;
    func;
    constructor(key, func) {
        this.key = key;
        this.func = func;
    }
}
const data = fr.getInput(year,day).map(y => {
    let parts = y.split(': ');
    let cmd = parts[1].split(' ');

    if (cmd.length === 1) {
        y = new Command(parts[0], new Function('return ' + parseInt(parts[1])));
    } else {
        y = new Command(parts[0], new Function('return calc(\'' + cmd[0] +'\') ' + cmd[1] + ' calc(\'' + cmd[2] + '\')'));
    }
    return y;
});

let commands = new Map();
data.forEach(x => {
    commands.set(x.key, x.func);
})

// "new Function" syntax results in functions that only have access to global scope
global.calc = function calc(key) {
    return commands.get(key)();
}

let answer = calc('root');
console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);