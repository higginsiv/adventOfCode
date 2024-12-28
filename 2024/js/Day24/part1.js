import { Solution } from '#tools/solution.js';
import { EOL } from 'os';

export default function solve({ lines, rawData }) {
    class Gate {
        key;
        value;
        operation;
        param1;
        param2;
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

    initial.forEach(([key, value]) => {
        gates.set(key, new Gate(key, Number(value), null, null, null));
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

    zGates.sort((a, b) => -1 * a.key.localeCompare(b.key));

    for (let gate of zGates) {
        gate.value = getValue(gate.key);
    }

    const answer = parseInt(
        zGates.reduce((acc, gate) => acc + gate.value, ''),
        2,
    );
    return new Solution(answer);

    function getValue(key) {
        let gate = gates.get(key);
        if (gate.value !== null) {
            return gate.value;
        }

        let paramGate1 = gates.get(gate.param1);
        let paramGate2 = gates.get(gate.param2);

        let value1 = paramGate1.value !== null ? paramGate1.value : getValue(gate.param1);
        let value2 = paramGate2.value !== null ? paramGate2.value : getValue(gate.param2);

        gate.value = gate.operation(value1, value2);
        return gate.value;
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
