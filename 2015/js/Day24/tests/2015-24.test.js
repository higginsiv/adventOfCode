import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../part1.js';
import { default as part2 } from '../part2.js';

const data = getInputForFunction('2015', '24');

describe(`2015 Day 24`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(11266889531);
    });

    // TODO refactor because test takes 2+ minutes
    // test('Part 2', () => {
    //     expect(part2(data).value).toBe(77387711);
    // });
});
