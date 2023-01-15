console.time();
const async = require("async");
const fr = require('../../../tools/fileReader');
const [year, day, part] = ["2019","07","2"];
const MATH = require('../../../tools/math.js');
const IC = require('../common/IntCode.js');
const PHASES = [5n, 6n, 7n, 8n, 9n];
const NUM_AMPS = 5;
const [A, B, C, D, E] = ['A', 'B', 'C', 'D', 'E']
const AMP_KEYS = [A, B, C, D, E]
let memory = fr.getInput(year,day, ',').map(x => BigInt(x));


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
reduction(phasePerms);

async function reduction(phasePerms) {
    let answer = await phasePerms.reduce(async (maxThruster, curr, index) => {
        let thruster = await findThruster(curr, memory);
        return thruster > await maxThruster ? thruster : maxThruster;
    }, -Infinity);

    console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
    console.timeEnd();
}

async function findThruster(curr, memory) {
    let amps = [];
    for (let i = 0; i < NUM_AMPS; i++) {
        if (i === 0) {
            amps.push(new Amp(A, [curr[i], 0n], [curr[i + 1]], memory.slice()));
        } else if (i !== NUM_AMPS - 1) {
            amps.push(new Amp(AMP_KEYS[i], amps[i - 1].output, [curr[i + 1]], memory.slice()));
        } else {
            amps.push(new Amp(AMP_KEYS[i], amps[i - 1].output, amps[0].input , memory.slice()));
        }
    }

    let promises = []
    amps.forEach(amp => {
        promises.push(IC.runAsync(amp.memory, 0n, amp.input, amp.output));
    })
    await Promise.all(promises)

    let thruster = amps.pop().output.pop();

    return new Promise((resolve, reject) => {
        resolve(thruster);
    });
}