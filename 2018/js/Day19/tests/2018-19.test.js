import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../problem1.js';
import { default as part2 } from '../problem2.js';

const data = getInputForFunction('2018', '19');

describe(`2018 Day 19`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(948);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(10695960);
    });
});
