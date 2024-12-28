import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../part1.js';
import { default as part2 } from '../part2.js';

const data = getInputForFunction('2020', '01');

describe(`2020 Day 01`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(787776);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(262738554);
    });
});
