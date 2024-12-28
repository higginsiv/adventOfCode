import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../part1.js';
import { default as part2 } from '../part2.js';

const data = getInputForFunction('2023', '04');

describe(`2023 Day 04`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(21568);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(11827296);
    });
});
