import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../part1.js';
import { default as part2 } from '../part2.js';

describe(`2021 Day 04`, () => {
    test('Part 1', () => {
        const data = getInputForFunction('2021', '04');
        expect(part1(data).value).toBe(33348);
    });

    test('Part 2', () => {
        const data = getInputForFunction('2021', '04');
        expect(part2(data).value).toBe(8112);
    });
});
