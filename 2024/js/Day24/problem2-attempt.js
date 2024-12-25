import { Solution } from '#tools/solution.js';
import { EOL } from 'os';

export default function solve({ lines, rawData }) {
    class Gate {
        key;
        value;
        operation;
        param1;
        param2;
        dependencies = []
        constructor(key, value, operation, param1, param2) {
            this.key = key;
            this.value = value;
            this.operation = operation;
            this.param1 = param1;
            this.param2 = param2;
        }
    }

    rawData = rawData.split(EOL + EOL);

    let initial = rawData[0].split(EOL).map((line) => line.split(': '));
    let instructions = rawData[1].split(EOL).map((line) => line.split(' -> '));

    let gates = new Map();
    let zGates = [];
    let xGates = [];
    let yGates = [];

    initial.forEach(([key, value]) => {
        gates.set(key, new Gate(key, Number(value), null, null, null));
        if (key.startsWith('x')) {
            xGates.push(gates.get(key));
        } else {
            yGates.push(gates.get(key));
        }
    });

    instructions.forEach(([instruction, key]) => {
        let [param1, operation, param2] = instruction.split(' ');
        let opFunction;
        switch (operation) {
            case 'AND':
                opFunction = and;
                break;
            case 'OR':
                opFunction = or;
                break;
            case 'XOR':
                opFunction = xor;
                break;
        }
        let gate = new Gate(key, null, opFunction, param1, param2);
        gates.set(key, gate);
        if (key.startsWith('z')) {
            zGates.push(gate);
        }
    });

    console.log(zGates.length);
    xGates.sort((a, b) => a.key.localeCompare(b.key));
    yGates.sort((a, b) => a.key.localeCompare(b.key));
    // const xSum = parseInt(
    //     xGates.reduce((acc, gate) => acc + gate.value, ''),
    //     2,
    // );
    // const ySum = parseInt(
    //     yGates.reduce((acc, gate) => acc + gate.value, ''),
    //     2,
    // );
    // const sum = xSum + ySum;

    zGates.sort((a, b) => a.key.localeCompare(b.key));
    simulate(zGates);
    // console.log(xSum, ySum, sum);
    console.log('x: ', xGates.map((gate) => gate.value).join('').padEnd(zGates.length, '0'));
    console.log('y: ', yGates.map((gate) => gate.value).join('').padEnd(zGates.length, '0'));
    console.log('z: ', zGates.map((gate) => gate.value).join(''));
    console.log('dep: ', getDependencies('z00'));

    const MAX_SWAPS = 2;
    let carry = 0;
    for (let i = 0; i < zGates.length; i++) {
        let xBit = xGates[i]?.value || 0;
        let yBit = yGates[i]?.value || 0;
        let xYSum = xBit + yBit + carry;
        if (xYSum > 1) {
            carry = 1;
            xYSum -= 2;
        } else {
            carry = 0;
        }
        if (zGates[i].value === xYSum) {
            continue;
        }

        let dependencies = getDependencies(zGates[i].key)

        console.log('flipping', zGates[i].key, 'dependencies:', dependencies);

        // flip a pair and see what happens

    }
    const answer = 0;
    return new Solution(answer);

    function findSwaps(zIndex, swapsRemaining, invalidSwaps, carry) {
        if (swapsRemaining === 0) {
            return simulate(zGates);
        }

        let newCarry;
        let zGate = zGates[zIndex];
        let xBit = xGates[zIndex]?.value || 0;
        let yBit = yGates[zIndex]?.value || 0;
        let xYSum = xBit + yBit + carry;
        if (xYSum > 1) {
            newCarry = 1;
            xYSum -= 2;
        } else {
            newCarry = 0;
        }

        let dependencies = getDependencies(zGate.key);
        let possibleSwaps = dependencies.filter((key) => !invalidSwaps.includes(key));
        
        return findSwaps(zIndex, swapsRemaining - 1, invalidSwaps, newCarry);

    }

    function simulate(zGates) {
        for (let i = 0; i < 6; i++) {
            let gate = zGates[i];
            console.log('******************')
            console.log(gate.key);
            gate.value = getValue(gate.key);
            console.log('******************')
        }

        return parseInt(
            zGates.reduce((acc, gate) => acc + gate.value, ''),
            2,
        );
    }
    function getValue(key) {
        // console.log('key: ', key);
        let gate = gates.get(key);
        if (gate.value !== null) {
            return gate.value;
        }

        console.log(gate.param1, gate.param2, '->', gate.key);
        let paramGate1 = gates.get(gate.param1);
        let paramGate2 = gates.get(gate.param2);

        let value1 = paramGate1.value !== null ? paramGate1.value : getValue(gate.param1);
        let value2 = paramGate2.value !== null ? paramGate2.value : getValue(gate.param2);

        // TODO Undo this, took away caching just for logging
        // gate.value = gate.operation(value1, value2);
        // return gate.value;
        return gate.operation(value1, value2);
    }

    function getDependencies(key) {
        let gate = gates.get(key);

        if (key.startsWith('x') || key.startsWith('y')) {
            return [];
        }

        let dependencies = [key];
        if (gate.param1.startsWith('x') || gate.param1.startsWith('y')) {
            // dependencies.push(gate.param1);
        } else {
            dependencies = dependencies.concat(getDependencies(gate.param1));
        }

        if (gate.param2 && (gate.param2.startsWith('x') || gate.param2.startsWith('y'))) {
            // dependencies.push(gate.param2);
        } else if (gate.param2) {
            dependencies = dependencies.concat(getDependencies(gate.param2));
        }

        return dependencies;
    }

    function and(a, b) {
        return a & b;
    }

    function or(a, b) {
        return a | b;
    }

    function xor(a, b) {
        return a ^ b;
    }
}

// Number of gates that zGate depends on is 4*zIndex - 1;


// z01 = rkf XOR mgk
// z01 = (x01 XOR y01) XOR (y00 AND x00)
// z02 = rwp XOR kfr
// z02 = (nfw OR KMJ) XOR (y02 XOR x02)
// z02 = ((x01 AND y01)) OR (x01 AND y01) ) XOR (y02 XOR x02)