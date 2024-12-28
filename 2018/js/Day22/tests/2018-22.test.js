import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../part1.js';
import { default as part2 } from '../part2.js';

const data = getInputForFunction('2018', '22');

describe(`2018 Day 22`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(11810);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(1015);
    });
});
