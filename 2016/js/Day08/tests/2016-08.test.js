import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../part1.js';
import { default as part2 } from '../part2.js';

const data = getInputForFunction('2016', '08');

describe(`2016 Day 08`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(106);
    });

    test('Part 2', () => {
        // Spells CFLELOYFCS
        const expected =
            '01100111101000011110100000110010001111100110001110_10010100001000010000100001001010001100001001010000_10000111001000011100100001001001010111001000010000_10000100001000010000100001001000100100001000001100_10010100001000010000100001001000100100001001000010_01100100001111011110111100110000100100000110011100';
        const actual = part2(data)
            .value.map((row) => row.join(''))
            .join('_');
        expect(actual).toBe(expected);
    });
});
