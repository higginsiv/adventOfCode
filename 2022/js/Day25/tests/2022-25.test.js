const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);

const data = fr.getInputForFunction('2022', '25');

describe(`2022 Day 25`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe('2=-0=1-0012-=-2=0=01');
    });
});
