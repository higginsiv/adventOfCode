import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../part1.js';
import { default as part2 } from '../part2.js';

const data = getInputForFunction('2020', '13');

describe(`2020 Day 13`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(2545);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(266204454441577);
    });
});
