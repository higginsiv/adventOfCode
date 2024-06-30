import { getInputForFunction } from '../../../../tools/fileReader.js';
import { solve as part1 } from '../problem1.js';
import { solve as part2 } from '../problem2.js';

const data = getInputForFunction('2016', '15');

describe(`2016 Day 15`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(376777);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(3903937);
    });
});
