import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../problem1.js';
import { default as part2 } from '../problem2.js';

const data = getInputForFunction('2017', '10');

describe(`2017 Day 10`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(4480);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe('c500ffe015c83b60fad2e4b7d59dabc4');
    });
});
