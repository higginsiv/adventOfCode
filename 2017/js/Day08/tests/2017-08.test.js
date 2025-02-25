import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../part1.js';
import { default as part2 } from '../part2.js';

const data = getInputForFunction('2017', '08');

describe(`2017 Day 08`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(5849);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(6702);
    });
});
