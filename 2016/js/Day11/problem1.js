module.exports = {solve: solve};

function solve({lines, rawData}) {
    const generatorRegex = /\b(\w+)(?=\s*generator)/g;
    const compatibleRegex = /\b(\w+-compatible)\b/g;

    let containment = Array(4).fill(0);
    let bitmasks = new Map();
    let visited = [];
    let numMicrochips = 0;

    lines = lines.map(line => {
        const generators = line.match(generatorRegex) || [];
        const microchips= (line.match(compatibleRegex) || []);
        numMicrochips += microchips.length;
        return {generators, microchips};
    });

    let microchipsMasked = 0;
    let generatorsMasked = 0;
    lines.forEach((line) => {
        line.generators.forEach(generator => {
            let microchipBitmask = 1 << microchipsMasked;
            microchipsMasked++;

            let generatorBitmask = 1 << (numMicrochips + generatorsMasked);
            generatorsMasked++;

            bitmasks.set(generator, microchipBitmask);
            bitmasks.set(generator + '-compatible', generatorBitmask);
        });
    });

    lines.forEach((line, i) => {
        line.generators.forEach(generator => {
            containment[i] |= bitmasks.get(generator);
        });
        line.microchips.forEach(microchip => {
            containment[i] |= bitmasks.get(microchip);
        });
    });

    let queue = [{elevator: 0, state: containment, steps: 0}];

    while (queue.length > 0) {
        let {elevator, state, steps} = queue.shift();
        if (hasVisitedState(state[elevator], elevator)) {
            continue;
        }

        // visited.push(state);
        // if (isGoalState(state)) {
        //     return {value: steps};
        // }
        let possibleStates = getPossibleStates(state, elevator);
        queue.push(...possibleStates.map(state => ({elevator: elevator + 1, state, steps: steps + 1})));
    }

    function hasVisitedState(floorState, elevator) {
        return visited[elevator].some(visitedState => visitedState === floorState);
    }

    getPossibleStates(state, elevator) {
        
    }

    let answer;
    return {value: answer};
}