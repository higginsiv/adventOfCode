console.time();
const fr = require('../../../tools/fileReader');
const ic = require('../common/IntCode.js');
const [year, day, part] = ["2019","02","2"];
const ANSWER = 19690720;
let data = fr.getInput(year,day, ',').map(x => parseInt(x));

let answer;

for (let noun = 0; noun < 99; noun++) {
    let answerFound = false;
    for (let verb = 0; verb < 99; verb++) {
        let memory = data.slice();
        memory[1] = noun;
        memory[2] = verb;

        answer = ic.run(memory);
        if (answer === ANSWER) {
            answerFound = true;
            answer = 100 * noun + verb;
            break;
        }
    }
    if (answerFound) {
        break;
    }
}

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();
// 8500 too high