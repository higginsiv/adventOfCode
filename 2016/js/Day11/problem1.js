module.exports = { solve: solve };
// console.log = () => {};
function solve({ lines, rawData }) {
    let { insertIntoSortedQueue } = require('../../../tools/iteration.js');
    let answer;

    const generatorRegex = /\b(\w+)(?=\s*generator)/g;
    const compatibleRegex = /\b(\w+-compatible)\b/g;

    let containment = Array(4)
        .fill()
        .map(() => ({ generators: 0, microchips: 0 }));
    let bitmasks = new Map();
    let allMicrochips = [];
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
            allMicrochips.push(microchipBitmask);
        });
    });

    lines.forEach((line, i) => {
        line.generators.forEach((generator) => {
            containment[i].generators |= bitmasks.get(generator);
        });
        line.microchips.forEach((microchip) => {
            containment[i].microchips |= bitmasks.get(
                microchip.replace('-compatible', '')
            );
        });
    });

    let goalFloor = containment.length - 1;
    // console.log('goal', goalFloor);

    // console.log(containment);
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
            console.log('iter',it);
        }
        // console.log(getStateKey(queue[0]))

        let { elevator, state, steps, floor, fScore, minFloor } = queue.shift();
        // console.log(fScore)

        if (
            elevator === goalFloor &&
            state[elevator].microchips === all &&
            state[elevator].generators === all
        ) {
            answer = steps;
            // console.log(answer);
            break;
        }

        let possibleStates = getPossibleStates(state, elevator, minFloor);
        possibleStates
            .map((state) => ({
                state: structuredClone(state.state),
                elevator: state.elevator,
                steps: steps + 1,
                floor: floor,
                minFloor: minFloor,
            }))
            .forEach((state) => {
                let stateKey = getStateKey(state);
                // console.log('stateKey', stateKey);
                if (!hasVisitedSooner(stateKey, state.steps)) {
                    state.fScore = getFScore(
                        state.state,
                        stateKey,
                        state.steps
                    );
                    // console.log('fscore', state.fScore);
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

    function getPossibleStates(state, elevator, minFloor) {
        // console.log();
        // console.log('elevator', elevator);
        let possibleStates = [];
        let { microchips, generators } = state[elevator];
        let microchipsOnFloor = [];
        let generatorsOnFloor = [];
        allMicrochips.forEach((value) => {
            if (microchips & value) {
                microchipsOnFloor.push(value);
            }
            if (generators & value) {
                generatorsOnFloor.push(value);
            }
        });
        // console.log(
        //     'microchipsOnFloor',
        //     microchipsOnFloor,
        //     'generatorsOnFloor',
        //     generatorsOnFloor
        // );
        let {
            singleMicrochips,
            singleGenerators,
            microChipPairs,
            generatorPairs,
            microchipAndGeneratorPairs,
        } = getCombinations(microchipsOnFloor, generatorsOnFloor);
        // console.log(
        //     singleMicrochips,
        //     singleGenerators,
        //     microChipPairs,
        //     generatorPairs,
        //     microchipAndGeneratorPairs
        // );
        // console.log('minFloor', minFloor);

        singleMicrochips.forEach((entity) => {
            // up or down
            if (elevator < goalFloor) {
                // TODO replace clone with just using microchips from earlier
                let newUpState = structuredClone(state);
                // console.log('before', newUpState[elevator])

                newUpState[elevator].microchips &= ~entity;
                // console.log('after', newUpState[elevator])
                newUpState[elevator + 1].microchips |= entity;

                // TODO: should I compare keys first?
                if (isGridSafe(newUpState)) {
                    possibleStates.push({
                        state: newUpState,
                        elevator: elevator + 1,
                        minFloor:
                            newUpState[minFloor].microchips === 0 &&
                            newUpState[minFloor].generators === 0
                                ? minFloor + 1
                                : minFloor,
                    });
                }
            }

            if (elevator > minFloor) {
                let newDownState = structuredClone(state);
                newDownState[elevator].microchips &= ~entity;
                newDownState[elevator - 1].microchips |= entity;

                if (isGridSafe(newDownState)) {
                    possibleStates.push({
                        state: newDownState,
                        elevator: elevator - 1,
                        minFloor: minFloor,
                    });
                }
            }
        });

        singleGenerators.forEach((entity) => {
            // up or down
            if (elevator < goalFloor) {
                let newUpState = structuredClone(state);
                newUpState[elevator].generators &= ~entity;
                newUpState[elevator + 1].generators |= entity;

                // TODO: should I compare keys first?
                if (isGridSafe(newUpState)) {
                    possibleStates.push({
                        state: newUpState,
                        elevator: elevator + 1,
                        minFloor:
                            newUpState[minFloor].microchips === 0 &&
                            newUpState[minFloor].generators === 0
                                ? minFloor + 1
                                : minFloor,
                    });
                }
            }

            if (elevator > minFloor) {
                let newDownState = structuredClone(state);
                newDownState[elevator].generators &= ~entity;
                newDownState[elevator - 1].generators |= entity;

                if (isGridSafe(newDownState)) {
                    possibleStates.push({
                        state: newDownState,
                        elevator: elevator - 1,
                        minFloor: minFloor,
                    });
                }
            }
        });

        microChipPairs.forEach((pair) => {
            // up
            if (elevator < goalFloor) {
                let newUpState = structuredClone(state);
                newUpState[elevator].microchips &= ~pair[0];
                newUpState[elevator + 1].microchips |= pair[0];
                newUpState[elevator].microchips &= ~pair[1];
                newUpState[elevator + 1].microchips |= pair[1];

                // TODO: should I compare keys first?
                if (isGridSafe(newUpState)) {
                    possibleStates.push({
                        state: newUpState,
                        elevator: elevator + 1,
                        minFloor:
                            newUpState[minFloor].microchips === 0 &&
                            newUpState[minFloor].generators === 0
                                ? minFloor + 1
                                : minFloor,
                    });
                }
            }
        });

        generatorPairs.forEach((pair) => {
            // up
            if (elevator < goalFloor) {
                let newUpState = structuredClone(state);
                newUpState[elevator].generators &= ~pair[0];
                newUpState[elevator + 1].generators |= pair[0];
                newUpState[elevator].generators &= ~pair[1];
                newUpState[elevator + 1].generators |= pair[1];

                // TODO: should I compare keys first?
                if (isGridSafe(newUpState)) {
                    possibleStates.push({
                        state: newUpState,
                        elevator: elevator + 1,
                        minFloor:
                            newUpState[minFloor].microchips === 0 &&
                            newUpState[minFloor].generators === 0
                                ? minFloor + 1
                                : minFloor,
                    });
                }
            }
        });

        microchipAndGeneratorPairs.forEach((pair) => {
            // up or down
            if (elevator < goalFloor) {
                let newUpState = structuredClone(state);
                newUpState[elevator].microchips &= ~pair[0];
                newUpState[elevator + 1].microchips |= pair[0];
                newUpState[elevator].generators &= ~pair[1];
                newUpState[elevator + 1].generators |= pair[1];

                // TODO: should I compare keys first?
                if (isGridSafe(newUpState)) {
                    possibleStates.push({
                        state: newUpState,
                        elevator: elevator + 1,
                        minFloor:
                            newUpState[minFloor].microchips === 0 &&
                            newUpState[minFloor].generators === 0
                                ? minFloor + 1
                                : minFloor,
                    });
                }
            }

            if (elevator > minFloor) {
                let newDownState = structuredClone(state);
                newDownState[elevator].microchips &= ~pair[0];
                newDownState[elevator - 1].generators |= pair[0];
                newDownState[elevator].microchips &= ~pair[1];
                newDownState[elevator - 1].generators |= pair[1];

                if (isGridSafe(newDownState)) {
                    possibleStates.push({
                        state: newDownState,
                        elevator: elevator - 1,
                        minFloor: minFloor,
                    });
                }
            }
        });
        // console.log('possibleStates', possibleStates.length);
        return possibleStates;
    }

    function getCombinations(microchips, generators) {
        let result = {
            singleMicrochips: [],
            singleGenerators: [],
            microChipPairs: [],
            generatorPairs: [],
            microchipAndGeneratorPairs: [],
        };

        for (let i = 0; i < microchips.length; i++) {
            result.singleMicrochips.push(microchips[i]);

            for (let j = i + 1; j < microchips.length; j++) {
                result.microChipPairs.push([microchips[i], microchips[j]]);
            }

            for (let j = 0; j < generators.length; j++) {
                if (microchips[i] === generators[j]) {
                    result.microchipAndGeneratorPairs.push([
                        microchips[i],
                        generators[j],
                    ]);
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
        // console.log('grid', grid)
        for (floor of grid) {
            // console.log('floor', floor)
            for (const microchip of allMicrochips) {
                if (
                    floor.microchips & microchip &&
                    !(floor.generators & microchip) &&
                    floor.generators & ~microchip
                ) {
                    // console.log('not safe', floor.microchips, floor.generators)
                    return false;
                }
            }
        }

        return true;
    }

    function getStateKey(state) {
        let pairs = [];
        for (const microchip of allMicrochips) {
            let floors = { microchip: null, generator: null };
            for (let i = 0; i < 4; i++) {
                if (state.state[i].microchips & microchip) {
                    floors.microchip = i;
                }
                if (state.state[i].generators & microchip) {
                    floors.generator = i;
                }
            }
            pairs.push(floors);
        }

        pairs.sort(
            (a, b) => a.microchip - b.microchip || a.generator - b.generator
        );
        let stateKey =
            pairs.reduce((total, curr) => {
                return total + curr.microchip + ',' + curr.generator + '-';
            }, '') + state.elevator;
        return stateKey;
    }

    return { value: answer };
}

// 49 wrong
