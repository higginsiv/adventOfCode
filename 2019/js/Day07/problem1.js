console.time();
const async = require("async");
const fr = require('../../../tools/fileReader');
const [year, day, part] = ["2019","07","1"];
const MATH = require('../../../tools/math.js');
const IC = require('../common/IntCode.js');
const PHASES = [0, 1, 2, 3, 4];
const NUM_AMPS = 5;
const [A, B, C, D, E] = ['A', 'B', 'C', 'D', 'E']
const AMP_KEYS = [A, B, C, D, E]
let memory = fr.getInput(year,day, ',').map(x => parseInt(x));


class Amp {
    key;
    input;
    output;
    memory;
    constructor(key, input, output, memory) {
        this.key = key;
        this.input = input;
        this.output = output;
        this.memory = memory;
    }
}
let phasePerms = MATH.permute(PHASES);

let answer = phasePerms.reduce((maxThruster, curr, index) => {
    // TODO kick off all 5 ICs async and await them all finishing

    // if (index > 0) return 0
    let amps = [];
    for (let i = 0; i < NUM_AMPS; i++) {
        if (i === 0) {
            amps.push(new Amp(A, [curr[i], 0], [curr[i + 1]], memory.slice()));
        } else if (i !== NUM_AMPS - 1) {
            amps.push(new Amp(AMP_KEYS[i], amps[i - 1].output, [curr[i + 1]], memory.slice()));
        } else {
            amps.push(new Amp(AMP_KEYS[i], amps[i - 1].output, [], memory.slice()));
        }
    }

    // console.log(amps.length)
    amps.forEach(amp => {
        IC.run(amp.memory, 0, amp.input, amp.output)
    })
    let thruster = amps.pop().output.pop();
    // console.log(thruster)
    return thruster > maxThruster ? thruster : maxThruster;
}, -Infinity);


console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();