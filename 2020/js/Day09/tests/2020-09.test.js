import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../part1.js';
import { default as part2 } from '../part2.js';

const data = getInputForFunction('2020', '09');

describe(`2020 Day 09`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(133015568);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(16107959);
    });
});
