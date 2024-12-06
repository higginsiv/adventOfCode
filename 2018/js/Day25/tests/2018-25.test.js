import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../problem1.js';

const data = getInputForFunction('2018', '25');

describe(`2018 Day 25`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(381);
    });
});
