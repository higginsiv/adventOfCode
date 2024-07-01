import { getInputForFunction } from '../../../../tools/fileReader.js';
import { default as part1 } from '../problem1.js';

const data = getInputForFunction('2022', '25');

describe(`2022 Day 25`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe('2=-0=1-0012-=-2=0=01');
    });
});
