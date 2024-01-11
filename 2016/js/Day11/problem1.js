module.exports = { solve: solve };
// console.log = () => {};
function solve({ lines, rawData }) {
    let { insertIntoSortedQueue } = require('../../../tools/iteration.js');
    let answer;

    const generatorRegex = /\b(\w+)(?=\s*generator)/g;
    const compatibleRegex = /\b(\w+-compatible)\b/g;

    let containment = Array(4).map(() => ({ generators: 0, microchips: 0 }));
    let bitmasks = new Map();
    let microchips = [];
    let generators = [];
    let microchipsToGenerators = new Map();
    let numMicrochips = 0;
    let globalVisited = new Map();
    let hScores = new Map();
    let factorBetweenMicrochipAndGenerator;

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

            bitmasks.set(generator, microchipBitmask);
            all |= microchipBitmask;

            generators.push(microchipBitmask);
            microchips.push(microchipBitmask);
        });
    });

    lines.forEach((line, i) => {
        line.generators.forEach((generator) => {
            containment[i].generators |= bitmasks.get(generator);
        });
        line.microchips.forEach((microchip) => {
            containment[i].microchips |= bitmasks.get(microchip.replace('-compatible', ''));
        });
    });

    let goalFloor = containment.length - 1;

    let queue = [
        {
            elevator: 0,
            state: containment,
            steps: 0,
            floor: 0,
            minFloor: 0,
        },
    ];

    let it = 0;
    while (queue.length > 0) {
        it++;
        if (it % 100000 === 0) {
            console.log(it);
        }
        // console.log(getStateKey(queue[0]))

        let { elevator, state, steps, floor, fScore } = queue.shift();
        // console.log(fScore)

        if (elevator === goalFloor && state[elevator].microchips === all && state[elevator].generators === all) {
                answer = steps;
                console.log(answer)
                break;
        }

        let possibleStates = getPossibleStates(state, elevator);
        possibleStates
            .map((state) => ({
                state: state.state.slice(),
                elevator: state.elevator,
                steps: steps + 1,
                floor: floor,
                minFloor: minFloor
            }))
            .forEach((state) => {
                let stateKey = getStateKey(state);
                if (!hasVisitedSooner(stateKey, state.steps)) {
                    state.fScore = getFScore(state.state, stateKey, state.steps);
                    // console.log(state.fScore)
                    insertIntoSortedQueue(queue, state, 'fScore');
                    globalVisited.set(stateKey, state.steps);
                }
            });
    }

    function getFScore(state, stateKey, steps) {
        let hScore = getHScore(state, stateKey);
        return hScore + steps;
    }

    function getHScore(state, stateKey) {
        if (hScores.has(stateKey)) {
            return hScores.get(stateKey);
        }

        let hScore = 0;
        state.forEach((floor, i) => {
            let onFloor = floor.toString(2).match(/1/g);
            onFloor = onFloor ? onFloor.length : 0;
            hScore += onFloor * (3 - i) * 2;
        });
        hScores.set(stateKey, hScore);
        return hScore;
    }

    function hasVisitedSooner(key, steps) {
        if (globalVisited.has(key)) {
            return globalVisited.get(key) < steps;
        }
        return false;
    }

    function getPossibleStates(state, elevator) {
        let possibleStates = [];
        let [microchips, generators] = state[elevator];
        let microchipsOnFloor = [];
        let generatorsOnFloor = [];
        bitmasks.forEach((value, key) => {
            if (microchips & value) {
                microchipsOnFloor.push(value);
            }
            if (generators & value) {
                generatorsOnFloor.push(value);
            }
        });

        let [singleMicrochips, singleGenerators, microChipPairs, generatorPairs, microchipAndGeneratorPairs] = getCombinations(microchipsOnFloor, generatorsOnFloor);

        singleMicrochips.forEach((microchip) => {
            // up or down
            if (elevator < goalFloor) {
                let newUpState = state.slice();
                newUpState[elevator] &= ~microchip;
                newUpState[elevator + 1] |= microchip;

                // TODO: should I compare keys first?
                if (isGridSafe(newUpState)) {
                    possibleStates.push({
                        state: newUpState,
                        elevator: elevator + 1,
                        minFloor: newUpState[elevator] === 0 ? elevator + 1 : state.minFloor,
                    });
                }
            }

            if (elevator > state.minFloor) {
                let newDownState = state.slice();
                newDownState[elevator] &= ~microchip;
                newDownState[elevator - 1] |= microchip;

                if (isGridSafe(newDownState)) {
                    possibleStates.push({
                        state: newDownState,
                        elevator: elevator - 1,
                        minFloor: minFloor,
                    });
                }
            }
        });

        singleGenerators.forEach((generator) => {
            // up or down
        });

        microChipPairs.forEach((pair) => {
            // up
        });

        generatorPairs.forEach((pair) => {
            // up
        });

        microchipAndGeneratorPairs.forEach((pair) => {
            // up or down
        });

        combinations.forEach((combination) => {
            // Eliminate all combinations of a microchip and generator that are not compatible
            if (combination.length > 1) {
                combination = combination.sort((a, b) => a - b);
                if ((microchips.includes(combination[0]) && generators.includes(combination[1]) ||
                    microchips.includes(combination[1]) && generators.includes(combination[0])) && 
                    combination[1] / combination[0] !== factorBetweenMicrochipAndGenerator) {
                    return;
                }
            }
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
                elevator > 0 && state.some((floor, i) => i < elevator && floor !== 0)
            ) {
                // Don't travel down with two microchips
                if (combination.length > 1 && microchips.includes(combination[0]) && microchips.includes(combination[1])) {
                    return;
                }
                let newDownState = state.slice();
                newDownState[elevator] &= ~combination[0];
                newDownState[elevator - 1] |= combination[0];

                if (combination.length > 1) {
                    newDownState[elevator] &= ~combination[1];
                    newDownState[elevator - 1] |= combination[1];
                }

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

    function getCombinations(microchips, generators) {
        let result = {singleMicrochips: [], singleGenerators: [], microChipPairs: [], generatorPairs: [], microchipAndGeneratorPairs: []};

        for (let i = 0; i < microchips.length; i++) {
            result.singleMicrochips.push(microchips[i]);

            for (let j = i + 1; j < microchips.length; j++) {
                result.microChipPairs.push([microchips[i], microchips[j]]);
            }

            for (let j = 0; j < generators.length; j++) {
                if (microchips[i] === generators[j]) {
                    result.microchipAndGeneratorPairs.push([microchips[i], generators[j]]);
                }
            }
        }

        for (let i = 0; i < generators.length; i++) {
            result.singleGenerators.push(generators[i]);

            for (let j = i + 1; j < generators.length; j++) {
                result.generatorPairs.push([generators[i], generators[j]]);
            }
        }

        return result;
    }

    function isGridSafe(grid) {
        for (floor of grid) {
            for (const [key, generator] of microchipsToGenerators) {
                if (floor & bitmasks.get(key)) {
                    if (
                        !(floor & bitmasks.get(generator)) &&
                        generators.some(
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

// 49 wrong