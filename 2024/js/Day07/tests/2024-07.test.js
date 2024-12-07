import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../problem1.js';
import { default as part2 } from '../problem2.js';

const data = getInputForFunction('2024', '07');

describe(`2024 Day 07`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(2654749936343);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(124060392153684);
    });
});