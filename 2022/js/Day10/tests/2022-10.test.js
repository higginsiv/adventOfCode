import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../problem1.js';
import { default as part2 } from '../problem2.js';

const data = getInputForFunction('2022', '10');

describe(`2022 Day 10`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(14920);
    });

    test('Part 2', () => {
        // Spells BUCACBUZ (but oddly with the bottom row missing)
        const rawAnswer = part2(data).value;
        let actual = '';
        rawAnswer.forEach((m) => {
            m.forEach((c) => {
                actual += c;
            });
            actual += '_';
        });

        expect(actual).toBe(
            '_###..#..#..##...##...##..###..#..#.####._#..#.#..#.#..#.#..#.#..#.#..#.#..#....#._###..#..#.#....#..#.#....###..#..#...#.._#..#.#..#.#....####.#....#..#.#..#..#..._#..#.#..#.#..#.#..#.#..#.#..#.#..#.#...._',
        );
    });
});
