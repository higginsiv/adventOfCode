const fr = require('../../../tools/fileReader');
const [year, day, part] = ["2022","10","2"];
const {EOL} = require('os');
const data = fr.getInput(year, day).map((x) => {
    return x.split(" ").map((y) => {
      if (y === "noop") {
        return 1;
      } else if (y === "addx") {
        return 2;
      } else {
        return parseInt(y);
      }
    });
  });
  
  const maxCycle = 240;
  const cycleInc = 40;
  const cycleStart = 0;
  
  let sumCycles = [];
  for (let i = cycleStart; i <= maxCycle; i += cycleInc) {
    sumCycles.push(i);
  }
  
  let x = 1;
  let cycle = 1;
  let cmdLine = 0;
  let message = '';
  
  while (cycle <= maxCycle) {
    if (sumCycles.includes(cycle - 1)) {
        message += EOL;
    }

    let cycleMod = ((cycle -1) % 40);
    if (cycleMod === x || cycleMod === (x - 1) || cycleMod === (x + 1)) {
        message += '#';
    } else {
        message += '.'
    }

    cycle++;
  
    data[cmdLine][0]--;
    if (data[cmdLine][0] <= 0) {
      x += data[cmdLine][1] == null ? 0 : data[cmdLine][1];
      cmdLine++;
    }
  }
  
console.log(message);