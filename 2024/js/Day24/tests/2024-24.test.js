import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../part1.js';
import { default as part2 } from '../part2.js';

const data = getInputForFunction('2024', '24');

describe(`2024 Day 24`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(41324968993486);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe('bmn,jss,mvb,rds,wss,z08,z18,z23');
    });
});
