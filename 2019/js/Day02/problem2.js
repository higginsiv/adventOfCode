console.time();
const fr = require('../../../tools/fileReader');
const ic = require('../common/IntCode.js');
const [year, day, part] = ['2019', '02', '2'];
const ANSWER = 19690720;
let data = fr.getInput(year, day, ',').map((x) => parseInt(x));

let answer;

for (let noun = 0; noun < 99; noun++) {
    let answerFound = false;
    for (let verb = 0; verb < 99; verb++) {
        let memory = data.slice();
        memory[1] = noun;
        memory[2] = verb;

        ic.run(memory).then(() => {
            answer = memory[0];
            if (answer === ANSWER) {
                answerFound = true;
                answer = 100 * noun + verb;
                console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
                console.log('Expected: 6718');
                console.timeEnd();
            }
        });
    }
}
