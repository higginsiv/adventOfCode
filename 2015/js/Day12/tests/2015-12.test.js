import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../part1.js';
import { default as part2 } from '../part2.js';

const data = getInputForFunction('2015', '12');

describe(`2015 Day 12`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(119433);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(68466);
    });
});
