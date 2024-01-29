module.exports = {solve: solve};

function solve({lines, rawData}) {
    function splitPattern(pattern) {
        if (pattern.length === 5) {
            return pattern;
        }
        if (pattern.length === 11) {
            return pattern;
        }

        if (pattern.length % 2 === 0) {
            return splitPatternIntoSize(pattern, 2);
        } else if (pattern.length % 3 === 0) {
            return splitPatternIntoSize(pattern, 3);
        }
        
    }

    function splitPatternIntoSize(pattern, size) {
        let newPatterns = [];
        let grid = pattern.split('/').map(row => row.split(''));
        for (let row = 0; row < grid.length; row += size) {
            for (let col = 0; col < grid.length; col += size) {
                let newPattern = [];
                newPattern.push(grid[row][col]);
                newPattern.push(grid[row][col + 1]);
                newPattern.push(grid[row + 1][col]);
                newPattern.push(grid[row + 1][col + 1]);
                newPatterns.push(newPattern.join('/'));
            }
        }
        return newPatterns;
    }

    function joinPattern(pattern) {

    }

    let enhancements = new Map();
    lines.forEach(line => {
        let [from, to] = line.split(' => ');
        enhancements.set(from, to);
    });

    const iterations = 5;
    let pattern = '.#./..#/###';

    console.log(splitPattern(pattern));
    console.log(splitPattern('.#..#..#./..#..#..#/#########/.#..#..#./..#..#..#/#########/.#..#..#./..#..#..#/#########'));
    const answer = null;
    return {value: answer};
}