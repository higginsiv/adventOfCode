module.exports = {solve: solve};

function solve({lines, rawData}) {
    const {sqrt} = Math;
    function splitPattern(pattern) {
        if (pattern.length === 5) {
            return pattern;
        }
        if (pattern.length === 11) {
            return pattern;
        }

        pattern = pattern.split('/').map(row => row.split(''));
        if (pattern.length % 2 === 0) {
            return splitPatternIntoSize(pattern, 2);
        } else if (pattern.length % 3 === 0) {
            return splitPatternIntoSize(pattern, 3);
        }
        
    }

    function splitPatternIntoSize(pattern, size) {
        let newPatterns = [];
        for (let row = 0; row < pattern.length; row += size) {
            for (let col = 0; col < pattern.length; col += size) {
                let newPattern = [];
                newPattern.push(pattern[row][col]);
                newPattern.push(pattern[row][col + 1]);
                newPattern.push(pattern[row + 1][col]);
                newPattern.push(pattern[row + 1][col + 1]);
                newPatterns.push(newPattern.join('/'));
            }
        }
        return newPatterns;
    }

    function joinPattern(patterns) {
        let size = sqrt(patterns[0].length);
        
    }

    let enhancements = new Map();
    lines.forEach(line => {
        let [from, to] = line.split(' => ');
        enhancements.set(from, to);
    });

    const iterations = 5;
    let pattern = '.#./..#/###';

    for (let i = 0; i < iterations; i++) {
        let splitPatterns = splitPattern(pattern);
        let mappedPatterns = splitPatterns.map(p => enhancements.get(p));
        pattern = joinPattern(mappedPatterns);
    }

    console.log(splitPattern(pattern));
    console.log(splitPattern('.#..#..#./..#..#..#/#########/.#..#..#./..#..#..#/#########/.#..#..#./..#..#..#/#########'));
    const answer = null;
    return {value: answer};
}