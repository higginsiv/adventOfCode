module.exports = { solve: solve };

function solve({ lines, rawData }) {
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

    const data = lines
        .map((x) => {
            x = x.replace('Valve ', '');
            x = x.replace(' has flow rate=', ' ');
            x = x.replace('; tunnels lead to valves ', ' ');
            x = x.replace('; tunnel leads to valve ', ' ');
            x = x.replaceAll(', ', ' ');
            x = x.split(' ');
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
    const START = 'AA';
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
                    totalDistance + 1,
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
            distances.set(x.name + '.' + y.name, calculateDistance(x, y));
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
        usefulValves,
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
        unopenedValves,
    ) {
        if (time < 0) {
            return totalFlow;
        }

        if (goalValveTime === 0 && ellyGoalValveTime === 0) {
            totalFlow += getBenefit(goalValve.flow, 0, time);
            totalFlow += getBenefit(ellyGoalValve.flow, 0, time);
            startValve = goalValve;
            ellyValve = ellyGoalValve;

            if (unopenedValves.length === 0) {
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
                    unopenedValves,
                );
            }
            let bestTotal = totalFlow;
            unopenedValves.forEach((x) => {
                // find valve for person

                goalValve = valves.get(x);
                goalValveTime =
                    distances.get(startValve.name + '.' + goalValve.name) + TIME_TO_OPEN;
                let localUnopened = unopenedValves.slice();
                localUnopened.splice(localUnopened.indexOf(goalValve.name), 1);

                if (localUnopened.length === 0) {
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
                        localUnopened,
                    );
                }
                localUnopened.forEach((y) => {
                    // find valve for elly
                    // lazily assume that no two choices have the same total flow value. Instead of pruning list of Person's choice, just skip it as an option for Elly
                    if (y !== x) {
                        ellyGoalValve = valves.get(y);
                        ellyGoalValveTime =
                            distances.get(ellyValve.name + '.' + ellyGoalValve.name) + TIME_TO_OPEN;
                        let ellyLocal = localUnopened.slice();
                        ellyLocal.splice(localUnopened.indexOf(ellyGoalValve.name), 1);

                        let total = navigate(
                            time - 1,
                            totalFlow,
                            startValve,
                            ellyValve,
                            goalValve,
                            ellyGoalValve,
                            goalValveTime - 1,
                            ellyGoalValveTime - 1,
                            ellyLocal,
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

            if (unopenedValves.length === 0) {
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
                    unopenedValves.slice(),
                );
            }
            let bestTotal = totalFlow;
            unopenedValves.forEach((x) => {
                goalValve = valves.get(x);
                goalValveTime =
                    distances.get(startValve.name + '.' + goalValve.name) + TIME_TO_OPEN;
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
                    localUnopened,
                );

                if (total > bestTotal) {
                    bestTotal = total;
                }
            });
            return bestTotal;
        } else if (ellyGoalValveTime === 0) {
            totalFlow += getBenefit(ellyGoalValve.flow, 0, time);

            ellyValve = ellyGoalValve;

            if (unopenedValves.length === 0) {
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
                    unopenedValves.slice(),
                );
            }
            let bestTotal = totalFlow;
            unopenedValves.forEach((x) => {
                ellyGoalValve = valves.get(x);
                ellyGoalValveTime =
                    distances.get(ellyValve.name + '.' + ellyGoalValve.name) + TIME_TO_OPEN;
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
                    localUnopened,
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
            unopenedValves,
        );
    }
    return { value: answer };
}
