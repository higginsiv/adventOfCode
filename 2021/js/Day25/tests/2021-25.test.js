import { getInputForFunction } from '../../../../tools/fileReader.js';
import { default as part1 } from '../problem1.js';

const data = getInputForFunction('2021', '25');

describe(`2021 Day 25`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(498);
    });
});
