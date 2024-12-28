import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../part1.js';

const data = getInputForFunction('2020', '25');

describe(`2020 Day 25`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(17673381);
    });
});
