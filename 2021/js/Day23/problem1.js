module.exports = { solve: solve };
const PriorityQueue = require('../../../tools/queue.js');

function solve({ lines, rawData }) {
    const letters = new Map([
        ['A', 'a'],
        ['B', 'b'],
        ['C', 'c'],
        ['D', 'd']
    ]);

    const energies = new Map([
        ['A', 1],
        ['a', 1],
        ['B', 10],
        ['b', 10],
        ['C', 100],
        ['c', 100],
        ['D', 1000],
        ['d', 1000]
    ]);

    const illegalSpots = [2, 4, 6, 8];

    let grid = new Map();
    let hallwaySpots = lines[1].split('').filter((x) => x === '.').length;
    // console.log(hallwaySpots);
    lines[2].match(/[A-Z]/g).forEach((letter, index) => {
        let key = letter;
        if (grid.has(letter)) {
            key = letters.get(letter);
        }
        grid.set(key, hallwaySpots + 2 * index);
    });

    lines[3].match(/[A-Z]/g).forEach((letter, index) => {
        let key = letter;
        if (grid.has(letter)) {
            key = letters.get(letter);
        }
        grid.set(key, hallwaySpots + 1 + 2 * index);
    });

    // console.log(grid);

    let queue = new PriorityQueue([{grid, energy: 0}], compare);

    while (queue.isNotEmpty()) {
        let current = queue.next();
    }

    const answer = null;
    return { value: answer };
}

function addPossibleMoves(state, queue, energies) {
    let { grid, energy } = state;

    
    let keys = Array.from(grid.keys());
    keys.forEach((key) => {
        let value = grid.get(key);
        const isInAnyRoom = isInAnyRoom(value);
        if (isInAnyRoom) {
            if (!isInCorrectRoom(key, value)) {
                let newGrid = new Map(grid);
                // TODO not just +1, need all possible moves
                newGrid.set(key, value + 1);
                queue.add({grid: newGrid, energy: energy + energies.get(key)});
            }
        } else {
            let newGrid = new Map(grid);
            // TODO not just +1, need all possible moves
            // move left

            // move right

            // move into room
            newGrid.set(key, value + 1);
            queue.add({grid: newGrid, energy: energy + energies.get(key)});
        }

    });
    return moves;
}

function compare(a, b) {
    return a.energy - b.energy;
}

function isInCorrectRoom(key, value) {
    key = key.toUpperCase();
    switch (key) {
        case 'A':
            return value === 11 || value === 12;
        case 'B':
            return value === 13 || value === 14;
        case 'C':
            return value === 15 || value === 16;
        case 'D':
            return value === 17 || value === 18;
    }
}

function isInAnyRoom(value) {
    return value >= 11 && value <= 18;
}

// TODO this key is wrong
function getKey(grid, energy) {
    return Array.from(grid.keys()).join('-') + '-' + energy;
}