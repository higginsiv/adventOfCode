import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../problem1.js';
import { default as part2 } from '../problem2.js';

const data = getInputForFunction('2018', '13');

describe(`2018 Day 13`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe('83,121');
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe('102,144');
    });
});
