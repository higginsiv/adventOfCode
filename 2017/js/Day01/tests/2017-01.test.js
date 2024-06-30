import { getInputForFunction } from '../../../../tools/fileReader.js';
import { solve as part1 } from '../problem1.js';
import { solve as part2 } from '../problem2.js';

const data = getInputForFunction('2017', '01');

describe(`2017 Day 01`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(1150);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(1064);
    });
});
