module.exports = { solve: solve };

function solve({ lines, rawData }) {
    let { insertIntoSortedQueue } = require('../../../tools/iteration.js');
    let answer;

    const generatorRegex = /\b(\w+)(?=\s*generator)/g;
    const compatibleRegex = /\b(\w+-compatible)\b/g;

    let containment = Array(4).fill(0);
    let bitmasks = new Map();
    let microchipsToGenerators = new Map();
    let numMicrochips = 0;

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

    let queue = [
        {
            elevator: 0,
            state: containment,
            steps: 0,
            visited0: [],
            visited1: [],
            visited2: [],
            visited3: [],
        },
    ];

    let it = 0;
    while (queue.length > 0) {
        it++;
        if (it % 100000 === 0) {
            console.log(it);
        }
        let { elevator, state, steps, visited0, visited1, visited2, visited3 } =
            queue.shift();

        if (elevator === 3 && state[elevator] === all) {
            answer = steps;
            break;
        }

        switch (elevator) {
            case 0:
                visited0.push(state[elevator]);
                break;
            case 1:
                visited1.push(state[elevator]);
                break;
            case 2:
                visited2.push(state[elevator]);
                break;
            case 3:
                visited3.push(state[elevator]);
                break;
        }

        let possibleStates = getPossibleStates(state, elevator);
        // console.log(possibleStates.length)
        // queue.push(
            possibleStates.map((state) => ({
                state: state.state.slice(),
                elevator: state.elevator,
                steps: steps + 1,
                visited0: visited0.slice(),
                visited1: visited1.slice(),
                visited2: visited2.slice(),
                visited3: visited3.slice(),
            })).forEach((state) => {
                if (!hasVisitedState(state.state[state.elevator], state.elevator, [state.visited0, state.visited1, state.visited2, state.visited3])) {
                    insertIntoSortedQueue(
                        queue,
                        state,
                        'steps'
                    );
                }
            });
    }

    function hasVisitedState(floorState, elevator, visited) {
        return visited[elevator].some(
            (visitedState) => visitedState === floorState
        );
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
            if (elevator < 3) {
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

            if (elevator > 0 && state.some((value, index) => {
                return index < elevator && value !== 0;
            })) {
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

        // Add each individual element to the result
        for (let i = 0; i < array.length; i++) {
            result.push([array[i]]);
        }

        // Add all combinations of two elements to the result
        for (let i = 0; i < array.length; i++) {
            for (let j = i + 1; j < array.length; j++) {
                result.push([array[i], array[j]]);
            }
        }

        return result;
    }

    function isGridSafe(grid) {
        let gridSafe = true;
        // todo make this iterative so I can break
        grid.forEach((floor, index) => {
            // console.log('floor ' + index + ': ' + floor);
            let floorSafe = true;
            // todo make this iterative so I can break
            microchipsToGenerators.forEach((generator, key) => {
                if (floor & bitmasks.get(key)) {
                    if (
                        !(floor & bitmasks.get(generator)) &&
                        [...microchipsToGenerators.values()].some(
                            (value) => floor & bitmasks.get(value)
                        )
                    ) {
                        // console.log('here');
                        floorSafe = false;
                    }
                }
            });
            if (!floorSafe) {
                gridSafe = false;
            }
        });

        return gridSafe;
    }

    return { value: answer };
}
