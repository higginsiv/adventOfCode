import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../problem1.js';
import { default as part2 } from '../problem2.js';

const data = getInputForFunction('2021', '01');

describe(`2021 Day 01`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(1624);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(1653);
    });
});
