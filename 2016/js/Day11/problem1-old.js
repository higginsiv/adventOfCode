module.exports = { solve: solve };
// console.log = () => {};
function solve({ lines, rawData }) {
    let { insertIntoSortedQueue } = require('../../../tools/iteration.js');
    let answer;

    const generatorRegex = /\b(\w+)(?=\s*generator)/g;
    const compatibleRegex = /\b(\w+-compatible)\b/g;

    let containment = Array(4).fill(0);
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

            let generatorBitmask = 1 << (numMicrochips + generatorsMasked);
            generatorsMasked++;

            let microchipKey = generator + '-compatible';
            bitmasks.set(generator, microchipBitmask);
            bitmasks.set(microchipKey, generatorBitmask);
            all |= microchipBitmask | generatorBitmask;

            generators.push(generator);
            microchips.push(microchipKey);
            microchipsToGenerators.set(microchipKey, generator);
        });
    });

    factorBetweenMicrochipAndGenerator = Math.pow(2, numMicrochips);

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
    goalFloor = 3;
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

        let { elevator, state, steps, floor, fScore } = queue.shift();
        // console.log(fScore)

        if (elevator === goalFloor && state[elevator] === all) {
            if (elevator === 3) {
                answer = steps;
                console.log(answer)
                // break;
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
                    // todo calculate H-score (estimate of steps to goal)
                    // calc F-score (H-score + steps)
                    // store F Score
                    // insert into queue sorted by F-score
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
        let floorState = state[elevator];
        let onFloor = [];
        bitmasks.forEach((value, key) => {
            if (floorState & value) {
                onFloor.push(value);
            }
        });

        let combinations = getCombinations(onFloor);

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