import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../part1.js';

const data = getInputForFunction('2015', '25');

describe(`2015 Day 25`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(8997277);
    });
});
