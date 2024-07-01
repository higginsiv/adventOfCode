import { getInputForFunction } from '../../../../tools/fileReader.js';
import { default as part1 } from '../problem1.js';
import { default as part2 } from '../problem2.js';

const data = getInputForFunction('2021', '24');

describe(`2021 Day 24`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe('49917929934999');
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe('11911316711816');
    });
});
