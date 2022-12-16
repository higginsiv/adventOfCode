const fr = require("../../../tools/fileReader");
const [year, day, part] = ["2022", "16", "1"];

class Valve {
  name;
  flow;
  isOpen = false;
  children = [];
  constructor(name, flow, children) {
    this.name = name;
    this.flow = flow;
    this.children = children;
  }
}

let valves = new Map();

const data = fr
  .getInput(year, day)
  .map((x) => {
    x = x.replace("Valve ", "");
    x = x.replace(" has flow rate=", " ");
    x = x.replace("; tunnels lead to valves ", " ");
    x = x.replace("; tunnel leads to valve ", " ");
    x = x.replaceAll(", ", " ");
    x = x.split(" ");
    return x;
  })
  .forEach((x) => {
    const [name, flow, ...children] = x;
    let valve = new Valve(name, parseInt(flow), children);
    valves.set(name, valve);
  });

let openValves = [];
let usefulValves = [];

valves.forEach((x) => {
  if (x.flow === 0) {
    openValves.push(x.name);
  } else {
    usefulValves.push(x.name);
  }
});

const timeToMove = 1;
const timeToOpen = 1;
const NUM_OF_PATHS = 15;
const START = "AA";

function getBenefit(flow, distance, time) {
  return (time - timeToMove * distance - timeToOpen) * flow;
}

function calculateDistance(v1, v2, visited = [], totalDistance = 0) {
  if (v1.name == v2.name) {
    return totalDistance;
  }
  visited.push(v1.name);
  let minDistance = Infinity;
  v1.children.forEach((x) => {
    if (!visited.includes(x)) {
      let distance = calculateDistance(
        valves.get(x),
        v2,
        visited.slice(),
        totalDistance + 1
      );
      if (distance < minDistance) {
        minDistance = distance;
      }
    }
  });

  return minDistance;
}

let distances = new Map();
valves.forEach((x) => {
  valves.forEach((y) => {
    distances.set(x.name + "." + y.name, calculateDistance(x, y));
  });
});


let answer = navigate(30, 0, valves.get(START), usefulValves);

function navigate(time, totalFlow, startValve, unopenedValves) {
  if (time < 0) {
    return totalFlow;
  }
  
  if (unopenedValves.length === 0) {
    return totalFlow;
  }

  let flowToValve = new Map();
  unopenedValves.forEach((x) => {
    let valve = valves.get(x);
    let distance = distances.get(startValve.name + '.' + valve.name);
    let flow = getBenefit(valve.flow, distance, time);
    flowToValve.set(flow, valve);
  });

  // The slicing is an optional performance concern where I prune out undesired paths. Unfortunately I required nothing be pruned to solve p1
  let sortedFlows = Array.from(flowToValve.keys()).sort((a,b) => b-a).filter(x => {
    let valve = flowToValve.get(x);
    let distance = distances.get(startValve.name + '.' + valve.name);
    return time - distance - timeToOpen > 0
  }).slice(0, NUM_OF_PATHS);

  let bestTotal = totalFlow;
  sortedFlows.forEach(x => {
    let valve = flowToValve.get(x);
    let localUnopened = unopenedValves.slice();
    localUnopened.splice(localUnopened.indexOf(valve.name), 1);

    let total = navigate(time - distances.get(startValve.name + '.' + valve.name) - timeToOpen, totalFlow + x, valve, localUnopened);
    if (total > bestTotal) {
        bestTotal = total;
    }
  })
  return bestTotal;
}

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
