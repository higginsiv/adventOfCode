import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../part1.js';
import { default as part2 } from '../part2.js';

const data = getInputForFunction('2018', '04');

describe(`2018 Day 04`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(19025);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(23776);
    });
});
