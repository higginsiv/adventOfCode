const fr = require("../../../tools/fileReader");
const [year, day, part] = ["2022", "16", "2"];

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

const TIME_TO_OPEN = 1;
const NUM_OF_PATHS = 15;
const START = "AA";
const ELEPHANT_TIME = 4;

function getBenefit(flow, distance, time) {
    return (time - distance) * flow;
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

let answer = navigate(
  30 - ELEPHANT_TIME,
  0,
  valves.get(START),
  valves.get(START),
  valves.get(START),
  valves.get(START),
  0,
  0,
  usefulValves
);

// todo the 0 sequence, need to have iterations where elephant chooses first
function navigate(
  time,
  totalFlow,
  startValve,
  ellyValve,
  goalValve,
  ellyGoalValve,
  goalValveTime,
  ellyGoalValveTime,
  unopenedValves
) {
  if (time < 0) {
    // if (goalValveTime === 0) {
    //     totalFlow += getBenefit(goalValve.flow, 0, time);
    // }
    // if (ellyGoalValveTime === 0) {
    //     totalFlow += getBenefit(ellyGoalValve.flow, 0, time);
    // }
    return totalFlow;
  }

  //   if (unopenedValves.length === 0) {
  //     console.log('empty');
  //     // TODO return final math
  //     // totalFlow += getBenefit(goalValve.flow, 0, time);
  //     // totalFlow += getBenefit(ellyGoalValve.flow, 0, time);
  //     return totalFlow;
  //   }

  if (goalValveTime === 0 && ellyGoalValveTime === 0) {
    totalFlow += getBenefit(goalValve.flow, 0, time);
    totalFlow += getBenefit(ellyGoalValve.flow, 0, time);
    startValve = goalValve;
    ellyValve = ellyGoalValve;

    // SETUP FLOWS

    let flowToValve = new Map();
    let ellyFlowToValve = new Map();
    
    unopenedValves.forEach((x) => {
      let valve = valves.get(x);
      let distance = distances.get(startValve.name + "." + valve.name);
      let flow = getBenefit(valve.flow, distance, time);
      flowToValve.set(flow, valve);

      let ellyDistance = distances.get(ellyValve.name + "." + valve.name);
      let ellyFlow = getBenefit(valve.flow, ellyDistance, time);
      ellyFlowToValve.set(ellyFlow, valve);
    });

    let sortedFlows = Array.from(flowToValve.keys())
      .sort((a, b) => b - a)

    let ellySortedFlows = Array.from(ellyFlowToValve.keys())
      .sort((a, b) => b - a)

    // END SETUP FLOWS

    if (sortedFlows.length === 0) {
        // if there is nowhere for person to go, just keep iterating until time expires
        return navigate(
            time - 1,
            totalFlow,
            startValve,
            ellyValve,
            goalValve,
            ellyGoalValve,
            goalValveTime - 1,
            ellyGoalValveTime - 1,
            unopenedValves
          );
      }
    let bestTotal = totalFlow;
    unopenedValves.forEach((x) => {
      // find valve for person

      goalValve = flowToValve.get(x);
      goalValveTime =
        distances.get(startValve.name + "." + goalValve.name) + TIME_TO_OPEN;
      let localUnopened = unopenedValves.slice();
      localUnopened.splice(localUnopened.indexOf(goalValve.name), 1);

      if (ellySortedFlows.length === 0) {
        // if there is nowhere for elly to go, just keep iterating until time expires
        return navigate(
            time - 1,
            totalFlow,
            startValve,
            ellyValve,
            goalValve,
            ellyGoalValve,
            goalValveTime - 1,
            ellyGoalValveTime - 1,
            localUnopened
          );
      }
      ellySortedFlows.forEach((y) => {
        // find valve for elly
        // lazily assume that no two choices have the same total flow value. Instead of pruning list of Person's choice, just skip it as an option for Elly
        if (y !== x) {
          ellyGoalValve = ellyFlowToValve.get(y);
          ellyGoalValveTime =
            distances.get(ellyValve.name + "." + ellyGoalValve.name) +
            TIME_TO_OPEN;
          localUnopened.splice(localUnopened.indexOf(ellyGoalValve.name), 1);

          let total = navigate(
            time - 1,
            totalFlow,
            startValve,
            ellyValve,
            goalValve,
            ellyGoalValve,
            goalValveTime - 1,
            ellyGoalValveTime - 1,
            localUnopened
          );
          if (total > bestTotal) {
            bestTotal = total;
          }
        }
      });
    });
    return bestTotal;
  } else if (goalValveTime === 0) {
    totalFlow += getBenefit(goalValve.flow, 0, time);

    startValve = goalValve;

    // SETUP FLOWS

    let flowToValve = new Map();
    unopenedValves.forEach((x) => {
      let valve = valves.get(x);
      let distance = distances.get(startValve.name + "." + valve.name);
      let flow = getBenefit(valve.flow, distance, time);
      flowToValve.set(flow, valve);
    });

    let sortedFlows = Array.from(flowToValve.keys())
      .sort((a, b) => b - a)

    // END SETUP FLOWS

    if (sortedFlows.length === 0) {
        // if there is nowhere for person to go, just keep iterating until time expires
        return navigate(
            time - 1,
            totalFlow,
            startValve,
            ellyValve,
            goalValve,
            ellyGoalValve,
            goalValveTime - 1,
            ellyGoalValveTime - 1,
            unopenedValves.slice()
          );
      }
    let bestTotal = totalFlow;
    sortedFlows.forEach((x) => {
      goalValve = flowToValve.get(x);
      goalValveTime =
        distances.get(startValve.name + "." + goalValve.name) + TIME_TO_OPEN;
      let localUnopened = unopenedValves.slice();
      localUnopened.splice(localUnopened.indexOf(goalValve.name), 1);

      let total = navigate(
        time - 1,
        totalFlow,
        startValve,
        ellyValve,
        goalValve,
        ellyGoalValve,
        goalValveTime - 1,
        ellyGoalValveTime - 1,
        localUnopened
      );

      if (total > bestTotal) {
        bestTotal = total;
      }
    });
    return bestTotal;
  } else if (ellyGoalValveTime === 0) {
    totalFlow += getBenefit(ellyGoalValve.flow, 0, time);

    ellyValve = ellyGoalValve;

    // SETUP FLOWS

    let ellyFlowToValve = new Map();
    unopenedValves.forEach((x) => {
      let valve = valves.get(x);
      let ellyDistance = distances.get(ellyValve.name + "." + valve.name);
      let ellyFlow = getBenefit(valve.flow, ellyDistance, time);
      ellyFlowToValve.set(ellyFlow, valve);
    });

    let ellySortedFlows = Array.from(ellyFlowToValve.keys())
      .sort((a, b) => b - a)

    // END SETUP FLOWS

    if (ellySortedFlows.length === 0) {
        // if there is nowhere for elly to go, just keep iterating until time expires
        return navigate(
            time - 1,
            totalFlow,
            startValve,
            ellyValve,
            goalValve,
            ellyGoalValve,
            goalValveTime - 1,
            ellyGoalValveTime - 1,
            unopenedValves.slice()
          );
      }
    let bestTotal = totalFlow;
    ellySortedFlows.forEach((x) => {
      ellyGoalValve = ellyFlowToValve.get(x);
      ellyGoalValveTime =
        distances.get(ellyValve.name + "." + ellyGoalValve.name) + TIME_TO_OPEN;
      let localUnopened = unopenedValves.slice();
      localUnopened.splice(localUnopened.indexOf(ellyGoalValve.name), 1);

      let total = navigate(
        time - 1,
        totalFlow,
        startValve,
        ellyValve,
        goalValve,
        ellyGoalValve,
        goalValveTime - 1,
        ellyGoalValveTime - 1,
        localUnopened
      );

      if (total > bestTotal) {
        bestTotal = total;
      }
    });
    return bestTotal;
  }

  return navigate(
    time - 1,
    totalFlow,
    startValve,
    ellyValve,
    goalValve,
    ellyGoalValve,
    goalValveTime - 1,
    ellyGoalValveTime - 1,
    unopenedValves
  );

  // if at goal
  // add pressure * time remaining to total
  // recurse for every valve left on list
  // if both at goal
  // choose A for person
  // recurse for every valve left for elephant
  // choose A for elephant
  // recurse for every valve left for human
}

console.log("Year " + year + " Day " + day + " Puzzle " + part + ": " + answer);

// rename unopenedValves
// rename startValve
