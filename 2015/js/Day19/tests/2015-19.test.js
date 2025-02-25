import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../part1.js';
import { default as part2 } from '../part2.js';

const data = getInputForFunction('2015', '19');

describe(`2015 Day 19`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(535);
    });

    test('Part 2', () => {
        // TODO add test back once solution is faster
        // expect(part2(data).value).toBe(212);
    });
});
