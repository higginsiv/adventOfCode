// TODO Learn more about Ripple Carry Adders https://en.wikipedia.org/wiki/Adder_(electronics)#Ripple-carry_adder
// https://www.reddit.com/r/adventofcode/comments/1hla5ql/2024_day_24_part_2_a_guide_on_the_idea_behind_the/

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

    zGates.sort((a, b) => a.key.localeCompare(b.key));

    // Bad gate logic determined from properties of Ripple Carry Adders
    let badGates = [];

    // SUMS (value in Z gates) come from XOR operations
    for (let i = 0; i < zGates.length - 1; i++) {
        if (zGates[i].operation !== xor) {
            badGates.push(zGates[i].key);
        }
    }

    // CARRIES (value in other gates) come from AND/OR operations
    gates.forEach((gate, key) => {
        if (zGates.includes(gate)) {
            return;
        }
        let paramGate1 = gates.get(gate.param1);
        let paramGate2 = gates.get(gate.param2);
        if (paramGate1 === undefined || paramGate2 === undefined) {
            return;
        }
        if (
            paramGate1.key.startsWith('x') ||
            paramGate2.key.startsWith('x') ||
            paramGate1.key.startsWith('y') ||
            paramGate2.key.startsWith('y')
        ) {
            return;
        }
        if (gate.operation === xor) {
            badGates.push(gate.key);
        }
    });

    // SUMS are made from XOR, so if you have a base XOR from x and y, it must be the input to a z gate (xor operation)
    gates.forEach((gate, key) => {
        if (zGates.includes(gate)) {
            return;
        }
        let paramGate1 = gates.get(gate.param1);
        let paramGate2 = gates.get(gate.param2);
        if (paramGate1 === undefined || paramGate2 === undefined) {
            return;
        }
        if (
            (paramGate1.key.startsWith('x') || paramGate2.key.startsWith('x')) &&
            (paramGate1.key.startsWith('y') || paramGate2.key.startsWith('y')) &&
            gate.operation === xor
        ) {
            // First input does not follow these rules because it does not have carries yet

            if (
                (paramGate1.key === 'x00' || paramGate2.key === 'x00') &&
                (paramGate1.key === 'y00' || paramGate2.key === 'y00')
            ) {
                return;
            }
            if (
                ![...gates.values()].some(
                    (gate) =>
                        gate.operation === xor && (gate.param1 === key || gate.param2 === key),
                )
            ) {
                badGates.push(key);
            }
        }
    });

    // CARRIES are made up of (A and B) or (C and (A xor B)), therefore if you have an AND gate, it must be the input to an OR gate
    gates.forEach((gate, key) => {
        if (zGates.includes(gate)) {
            return;
        }
        let paramGate1 = gates.get(gate.param1);
        let paramGate2 = gates.get(gate.param2);
        if (paramGate1 === undefined || paramGate2 === undefined) {
            return;
        }
        if (
            (paramGate1.key.startsWith('x') || paramGate2.key.startsWith('x')) &&
            (paramGate1.key.startsWith('y') || paramGate2.key.startsWith('y')) &&
            gate.operation === and
        ) {
            // First input does not follow these rules because it does not have carries yet
            if (
                (paramGate1.key === 'x00' || paramGate2.key === 'x00') &&
                (paramGate1.key === 'y00' || paramGate2.key === 'y00')
            ) {
                return;
            }
            if (
                ![...gates.values()].some(
                    (gate) => gate.operation === or && (gate.param1 === key || gate.param2 === key),
                )
            ) {
                badGates.push(key);
            }
        }
    });

    const answer = badGates.sort().join();
    return new Solution(answer);

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
