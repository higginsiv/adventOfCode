const fr = require("../../../tools/fileReader");
const [year, day, part] = ["2022", "07", "1"];
const data = fr.getInput(year, day).map((command) => command.split(" "));

const root = "/";

class Dir {
  name;
  parent;
  children = new Map();
  size = 0;
  constructor(name, parent) {
    this.name = name;
    this.parent = parent;
  }
}

let disk = new Dir(root);
let currDir = disk;

data.forEach((command) => {
  [arg1, arg2, arg3] = command;
  if (arg1 === "$") {
    if (arg2 === "cd") {
      if (arg3 === "..") {
        currDir = currDir.parent;
      } else if (arg3 === root) {
        currDir = disk;
      } else {
        currDir = currDir.children.get(arg3);
      }
    }
  } else if (arg1 === "dir") {
    currDir.children.set(arg2, new Dir(arg2, currDir));
  } else {
    currDir.size += parseInt(arg1);
  }
});

const totalDiskSpace = 70000000;
const requiredSpace = 30000000;

let lowestSumOverMin = Infinity;
let sizes = [];
const diskSpaceUsed = calculateSize(disk);
const minSizeToDelete = requiredSpace - (totalDiskSpace - diskSpaceUsed);

lowestSumOverMin = sizes.reduce(
  (lowest, curr) => (curr < lowest && curr > minSizeToDelete ? curr : lowest),
  lowestSumOverMin
);

function calculateSize(dir) {
  let total = Array.from(dir.children.values()).reduce(
    (acc, currDir) => acc + calculateSize(currDir),
    dir.size
  );

  sizes.push(total);
  return total;
}

console.log(
  "Year " + year + " Day " + day + " Puzzle " + part + ": " + lowestSumOverMin
);
