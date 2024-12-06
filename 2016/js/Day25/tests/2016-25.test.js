import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../problem1.js';

const data = getInputForFunction('2016', '25');

describe(`2016 Day 25`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(198);
    });
});
