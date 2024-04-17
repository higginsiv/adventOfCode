const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
        
const data = fr.getInputForFunction('2015', '25');
        
describe(`2015 Day 25`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(8997277);
    });
});