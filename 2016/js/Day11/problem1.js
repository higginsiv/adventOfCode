module.exports = { solve: solve };
// console.log = () => {};
function solve({ lines, rawData }) {
    let { insertIntoSortedQueue } = require('../../../tools/iteration.js');
    let answer;

    const generatorRegex = /\b(\w+)(?=\s*generator)/g;
    const compatibleRegex = /\b(\w+-compatible)\b/g;

    let containment = Array(4).fill(0);
    let bitmasks = new Map();
    let microchipsToGenerators = new Map();
    let numMicrochips = 0;
    let globalVisited = new Map();
    // let shortestToClearRow = new Map();
    // for (let i = 0; i < 4; i++) {
    //     shortestToClearRow.set(i, Infinity);
    // }

    lines = lines.map((line) => {
        const generators = line.match(generatorRegex) || [];
        const microchips = line.match(compatibleRegex) || [];
        numMicrochips += microchips.length;
        return { generators, microchips };
    });

    let microchipsMasked = 0;
    let generatorsMasked = 0;
    let all = 0;

    lines.forEach((line) => {
        line.generators.forEach((generator) => {
            let microchipBitmask = 1 << microchipsMasked;
            microchipsMasked++;

            let generatorBitmask = 1 << (numMicrochips + generatorsMasked);
            generatorsMasked++;

            let microchipKey = generator + '-compatible';
            bitmasks.set(generator, microchipBitmask);
            bitmasks.set(microchipKey, generatorBitmask);
            all |= microchipBitmask | generatorBitmask;

            microchipsToGenerators.set(microchipKey, generator);
        });
    });

    lines.forEach((line, i) => {
        line.generators.forEach((generator) => {
            containment[i] |= bitmasks.get(generator);
        });
        line.microchips.forEach((microchip) => {
            containment[i] |= bitmasks.get(microchip);
        });
    });

    let goalFloor = containment.length - 1;
    for (let i = containment.length - 1; i >= 0; i--) {
        if (containment[i] === 0) {
            goalFloor--;
        }
    }
    goalFloor = 2;
    console.log(goalFloor)
    let queue = [
        {
            elevator: 0,
            state: containment,
            steps: 0,
            floor: 0,
        },
    ];

    let it = 0;
    while (queue.length > 0) {
        it++;
        if (it % 100000 === 0) {
            console.log(it);
        }
        // console.log(getStateKey(queue[0]))

        let { elevator, state, steps, floor } = queue.shift();


        if (elevator === goalFloor && state[elevator] === all) {
            if (elevator === 3) {
                answer = steps;
                break;
            } else {
                console.log('found', steps);
                goalFloor++;
                queue = [{ elevator: elevator, state: state, steps: steps, floor: floor}];
            }
        }

        let possibleStates = getPossibleStates(state, elevator);
        possibleStates
            .map((state) => ({
                state: state.state.slice(),
                elevator: state.elevator,
                steps: steps + 1,
                floor: floor
            }))
            .forEach((state) => {
                let stateKey = getStateKey(state);
                if (!hasVisitedSooner(stateKey, state.steps)) {
                    insertIntoSortedQueue(queue, state, 'steps');
                    globalVisited.set(stateKey, state.steps);
                }
            });
    }

    function hasVisitedSooner(key, steps) {
        if (globalVisited.has(key)) {
            return globalVisited.get(key) < steps;
        }
        return false;
    }

    function getPossibleStates(state, elevator) {
        let possibleStates = [];
        let floorState = state[elevator];
        let onFloor = [];
        bitmasks.forEach((value, key) => {
            if (floorState & value) {
                onFloor.push(value);
            }
        });

        let combinations = getCombinations(onFloor);

        combinations.forEach((combination) => {
            if (elevator < goalFloor) {
                let newUpState = state.slice();
                newUpState[elevator] &= ~combination[0];
                newUpState[elevator + 1] |= combination[0];
                if (combination.length > 1) {
                    newUpState[elevator] &= ~combination[1];
                    newUpState[elevator + 1] |= combination[1];
                }

                if (isGridSafe(newUpState)) {
                    possibleStates.push({
                        state: newUpState,
                        elevator: elevator + 1,
                    });
                }
            }

            if (
                elevator > 0 //&& state.some((floor, i) => i < elevator && floor !== 0)
            ) {
                let newDownState = state.slice();
                newDownState[elevator] &= ~combination[0];
                newDownState[elevator - 1] |= combination[0];

                if (combination.length > 1) {
                    newDownState[elevator] &= ~combination[1];
                    newDownState[elevator - 1] |= combination[1];
                }
                //todo increment state.floor

                if (isGridSafe(newDownState)) {
                    possibleStates.push({
                        state: newDownState,
                        elevator: elevator - 1,
                    });
                }
            }
        });

        return possibleStates;
    }

    function getCombinations(array) {
        let result = [];

        for (let i = 0; i < array.length; i++) {
            result.push([array[i]]);
        }

        for (let i = 0; i < array.length; i++) {
            for (let j = i + 1; j < array.length; j++) {
                result.push([array[i], array[j]]);
            }
        }

        return result;
    }

    function isGridSafe(grid) {
        for (floor of grid) {
            for ([key, generator] of microchipsToGenerators) {
                if (floor & bitmasks.get(key)) {
                    if (
                        !(floor & bitmasks.get(generator)) &&
                        [...microchipsToGenerators.values()].some(
                            (value) => floor & bitmasks.get(value)
                        )
                    ) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    function getStateKey(state) {
        let pairs = [];
        for ([key, generator] of microchipsToGenerators) {
            let floors = {microchip: 0, generator: 0}
            for (const floor of state.state) {
                if (floor & bitmasks.get(key)) {
                    floors.microchip = state.state.indexOf(floor);
                }
                if (floor & bitmasks.get(generator)) {
                    floors.generator = state.state.indexOf(floor);
                }
            }
            pairs.push(floors);
        }
        pairs.sort((a, b) => a.microchip - b.microchip || a.generator - b.generator);
        let stateKey = pairs.reduce((total, curr) => {
            return total + curr.microchip + ',' + curr.generator + '-'
        }, '') + state.elevator;
        return stateKey;
    }

    return { value: answer };
}
