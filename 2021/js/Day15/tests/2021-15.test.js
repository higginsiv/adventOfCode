import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../part1.js';
import { default as part2 } from '../part2.js';

const data = getInputForFunction('2021', '15');

describe(`2021 Day 15`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(553);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(2858);
    });
});
