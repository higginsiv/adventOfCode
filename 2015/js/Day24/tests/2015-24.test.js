const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2015', '24');

describe(`2015 Day 24`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(11266889531);
    });

    // TODO refactor because test takes 2+ minutes
    // test('Part 2', () => {
    //     expect(part2(data).value).toBe(77387711);
    // });
});