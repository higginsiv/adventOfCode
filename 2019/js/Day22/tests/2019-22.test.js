import { getInputForFunction } from '../../../../tools/fileReader.js';
import { solve as part1 } from '../problem1.js';
import { solve as part2 } from '../problem2.js';

const data = getInputForFunction('2019', '22');

describe(`2019 Day 22`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(3074);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(104073967000066);
    });
});
