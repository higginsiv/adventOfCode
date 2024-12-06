import PriorityQueue from '#tools/queue.js';

export default function solve({ lines, rawData }) {
    const [MICROCHIPS, GENERATORS] = [0, 1];
    let answer;

    const generatorRegex = /\b(\w+)(?=\s*generator)/g;
    const compatibleRegex = /\b(\w+-compatible)\b/g;

    let containment = Array(4)
        .fill()
        .map(() => [0, 0]);
    let bitmasks = new Map();
    let allMicrochips = [];
    let numMicrochips = 0;
    let globalVisited = new Map();
    let hScores = new Map();

    lines = lines.map((line) => {
        const generators = line.match(generatorRegex) || [];
        const microchips = line.match(compatibleRegex) || [];
        numMicrochips += microchips.length;
        return { generators, microchips };
    });

    let microchipsMasked = 0;
    let all = 0;

    lines.forEach((line) => {
        line.generators.forEach((generator) => {
            let microchipBitmask = 1 << microchipsMasked;
            microchipsMasked++;

            bitmasks.set(generator, microchipBitmask);
            all |= microchipBitmask;

            allMicrochips.push(microchipBitmask);
        });
    });

    lines.forEach((line, i) => {
        line.generators.forEach((generator) => {
            containment[i][GENERATORS] |= bitmasks.get(generator);
        });
        line.microchips.forEach((microchip) => {
            containment[i][MICROCHIPS] |= bitmasks.get(microchip.replace('-compatible', ''));
        });
    });

    let goalFloor = containment.length - 1;

    let queue = new PriorityQueue(
        [
            {
                elevator: 0,
                state: containment,
                steps: 0,
                floor: 0,
                minFloor: 0,
            },
        ],
        (a, b) => a.fScore - b.fScore,
    );

    while (queue.isNotEmpty()) {
        let { elevator, state, steps, floor, fScore, minFloor } = queue.next();

        if (
            elevator === goalFloor &&
            state[elevator][MICROCHIPS] === all &&
            state[elevator][GENERATORS] === all
        ) {
            answer = steps;
            break;
        }

        let possibleStates = getPossibleStates(state, elevator, minFloor);
        possibleStates
            .map((possibility) => ({
                state: possibility.state,
                elevator: possibility.elevator,
                steps: steps + 1,
                floor: floor,
                minFloor: minFloor,
            }))
            .forEach((possibility) => {
                let stateKey = getStateKey(possibility);

                if (!hasVisitedSooner(stateKey, possibility.steps)) {
                    possibility.fScore = getFScore(possibility.state, stateKey, possibility.steps);

                    queue.insert(possibility);
                    globalVisited.set(stateKey, possibility.steps);
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
            return globalVisited.get(key) <= steps;
        }
        return false;
    }

    function getPossibleStates(state, elevator, minFloor) {
        let possibleStates = [];
        let [microchips, generators] = state[elevator];
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

        let {
            singleMicrochips,
            singleGenerators,
            microChipPairs,
            generatorPairs,
            microchipAndGeneratorPairs,
        } = getCombinations(microchipsOnFloor, generatorsOnFloor);

        singleMicrochips.forEach((entity) => {
            // up or down
            if (elevator < goalFloor) {
                let tentState = state.map((floor) => [...floor]);
                tentState[elevator][MICROCHIPS] &= ~entity;
                tentState[elevator + 1][MICROCHIPS] |= entity;

                if (areFloorsSafe(tentState[elevator], tentState[elevator + 1])) {
                    possibleStates.push({
                        state: tentState,
                        elevator: elevator + 1,
                        minFloor:
                            tentState[minFloor][MICROCHIPS] === 0 &&
                            tentState[minFloor][GENERATORS] === 0
                                ? minFloor + 1
                                : minFloor,
                    });
                }
            }

            if (elevator > minFloor) {
                let tentState = state.map((floor) => [...floor]);
                tentState[elevator][MICROCHIPS] &= ~entity;
                tentState[elevator - 1][MICROCHIPS] |= entity;

                if (areFloorsSafe(tentState[elevator], tentState[elevator - 1])) {
                    possibleStates.push({
                        state: tentState,
                        elevator: elevator - 1,
                        minFloor: minFloor,
                    });
                }
            }
        });

        singleGenerators.forEach((entity) => {
            // up or down
            if (elevator < goalFloor) {
                let tentState = state.map((floor) => [...floor]);
                tentState[elevator][GENERATORS] &= ~entity;
                tentState[elevator + 1][GENERATORS] |= entity;

                if (areFloorsSafe(tentState[elevator], tentState[elevator + 1])) {
                    possibleStates.push({
                        state: tentState,
                        elevator: elevator + 1,
                        minFloor:
                            tentState[minFloor][MICROCHIPS] === 0 &&
                            tentState[minFloor][GENERATORS] === 0
                                ? minFloor + 1
                                : minFloor,
                    });
                }
            }

            if (elevator > minFloor) {
                let tentState = state.map((floor) => [...floor]);
                tentState[elevator][GENERATORS] &= ~entity;
                tentState[elevator - 1][GENERATORS] |= entity;

                if (areFloorsSafe(tentState[elevator], tentState[elevator - 1])) {
                    possibleStates.push({
                        state: tentState,
                        elevator: elevator - 1,
                        minFloor: minFloor,
                    });
                }
            }
        });

        microChipPairs.forEach((pair) => {
            // up
            if (elevator < goalFloor) {
                let tentState = state.map((floor) => [...floor]);
                tentState[elevator][MICROCHIPS] &= ~pair[0];
                tentState[elevator + 1][MICROCHIPS] |= pair[0];
                tentState[elevator][MICROCHIPS] &= ~pair[1];
                tentState[elevator + 1][MICROCHIPS] |= pair[1];

                if (areFloorsSafe(tentState[elevator], tentState[elevator + 1])) {
                    possibleStates.push({
                        state: tentState,
                        elevator: elevator + 1,
                        minFloor:
                            tentState[minFloor][MICROCHIPS] === 0 &&
                            tentState[minFloor][GENERATORS] === 0
                                ? minFloor + 1
                                : minFloor,
                    });
                }
            }
        });

        generatorPairs.forEach((pair) => {
            // up
            if (elevator < goalFloor) {
                let tentState = state.map((floor) => [...floor]);
                tentState[elevator][GENERATORS] &= ~pair[0];
                tentState[elevator + 1][GENERATORS] |= pair[0];
                tentState[elevator][GENERATORS] &= ~pair[1];
                tentState[elevator + 1][GENERATORS] |= pair[1];

                if (areFloorsSafe(tentState[elevator], tentState[elevator + 1])) {
                    possibleStates.push({
                        state: tentState,
                        elevator: elevator + 1,
                        minFloor:
                            tentState[minFloor][MICROCHIPS] === 0 &&
                            tentState[minFloor][GENERATORS] === 0
                                ? minFloor + 1
                                : minFloor,
                    });
                }
            }
        });

        microchipAndGeneratorPairs.forEach((pair) => {
            // up or down
            if (elevator < goalFloor) {
                let tentState = state.map((floor) => [...floor]);
                tentState[elevator][MICROCHIPS] &= ~pair[0];
                tentState[elevator + 1][MICROCHIPS] |= pair[0];
                tentState[elevator][GENERATORS] &= ~pair[1];
                tentState[elevator + 1][GENERATORS] |= pair[1];

                if (areFloorsSafe(tentState[elevator], tentState[elevator + 1])) {
                    possibleStates.push({
                        state: tentState,
                        elevator: elevator + 1,
                        minFloor:
                            tentState[minFloor][MICROCHIPS] === 0 &&
                            tentState[minFloor][GENERATORS] === 0
                                ? minFloor + 1
                                : minFloor,
                    });
                }
            }

            if (elevator > minFloor) {
                let tentState = state.map((floor) => [...floor]);
                tentState[elevator][MICROCHIPS] &= ~pair[0];
                tentState[elevator - 1][MICROCHIPS] |= pair[0];
                tentState[elevator][GENERATORS] &= ~pair[1];
                tentState[elevator - 1][GENERATORS] |= pair[1];

                if (areFloorsSafe(tentState[elevator], tentState[elevator - 1])) {
                    possibleStates.push({
                        state: tentState,
                        elevator: elevator - 1,
                        minFloor: minFloor,
                    });
                }
            }
        });
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

    function areFloorsSafe(floor1, floor2) {
        for (const microchip of allMicrochips) {
            if (
                floor1[MICROCHIPS] & microchip &&
                !(floor1[GENERATORS] & microchip) &&
                floor1[GENERATORS] & ~microchip
            ) {
                return false;
            }

            if (
                floor2[MICROCHIPS] & microchip &&
                !(floor2[GENERATORS] & microchip) &&
                floor2[GENERATORS] & ~microchip
            ) {
                return false;
            }
        }

        return true;
    }

    function getStateKey(state) {
        let pairs = [];
        for (const microchip of allMicrochips) {
            let floors = { microchip: null, generator: null };
            for (let i = 0; i < 4; i++) {
                if (state.state[i][MICROCHIPS] & microchip) {
                    floors.microchip = i;
                }
                if (state.state[i][GENERATORS] & microchip) {
                    floors.generator = i;
                }
            }
            pairs.push(floors);
        }

        pairs.sort((a, b) => a.microchip - b.microchip || a.generator - b.generator);
        let stateKey =
            pairs.reduce((total, curr) => {
                return total + curr.microchip + ',' + curr.generator + '-';
            }, '') + state.elevator;
        return stateKey;
    }

    return { value: answer };
}
