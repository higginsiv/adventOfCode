module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const { sqrt } = Math;
    function splitPattern(pattern) {
        pattern = pattern.split('/').map((row) => row.split(''));
        let size = pattern.length;
    
        if (size === 2 || size === 3) {
            return [pattern.map((row) => row.join('')).join('/')];
        } else if (size % 2 === 0) {
            return splitPatternIntoSize(pattern, 2);
        } else if (size % 3 === 0) {
            return splitPatternIntoSize(pattern, 3);
        }
    }

    function splitPatternIntoSize(pattern, size) {
        let newPatterns = [];
        for (let row = 0; row < pattern.length; row += size) {
            for (let col = 0; col < pattern.length; col += size) {
                let newPattern = [];
                for (let i = 0; i < size; i++) {
                    let newRow = '';
                    for (let j = 0; j < size; j++) {
                        newRow += pattern[row + i][col + j];
                    }
                    newPattern.push(newRow);
                }
                newPatterns.push(newPattern.join('/'));
            }
        }
        return newPatterns;
    }

    function joinPattern(patterns) {
        let size = sqrt(patterns.length);
        // console.log(patterns, size)
        let newPattern = [];
        for (let i = 0; i < patterns.length; i++) {
            let pattern = patterns[i].split('/');
            for (let j = 0; j < pattern.length; j++) {
                let row = (i % size) * pattern.length + j;
                if (!newPattern[row]) {
                    newPattern[row] = '';
                }
                newPattern[row] += pattern[j];
            }
        }
        console.log(newPattern);
        return newPattern.join('/');
    }

    function generateAllPatterns(pattern) {
        let patterns = [pattern];

        // Generate rotated patterns
        for (let i = 0; i < 3; i++) {
            pattern = rotatePattern(pattern);
            patterns.push(pattern);
        }

        // Generate flipped patterns
        pattern = flipPattern(patterns[0]); // Flip original pattern
        patterns.push(pattern);
        for (let i = 0; i < 3; i++) {
            pattern = rotatePattern(pattern); // Rotate flipped pattern
            patterns.push(pattern);
        }

        return patterns;
    }

    function rotatePattern(pattern) {
        let size = pattern.length;
        let newPattern = [];
        for (let row = 0; row < size; row++) {
            newPattern[row] = [];
            for (let col = 0; col < size; col++) {
                newPattern[row][col] = pattern[size - col - 1][row];
            }
        }
        return newPattern;
    }

    function flipPattern(pattern) {
        return pattern.map((row) => [...row].reverse());
    }

    let enhancements = new Map();
    lines.forEach((line) => {
        let [from, to] = line.split(' => ');
        let fromPatterns = generateAllPatterns(from.split('/').map((row) => row.split('')));
        fromPatterns.forEach((p) => {
            p = p.map((row) => row.join('')).join('/');
            if (enhancements.has(p) && enhancements.get(p) !== to){
                console.log('Duplicate enhancement', p, to);
            }
            enhancements.set(p, to);
        });
    });

    // console.log('###/###/###/..#/..#'.split(''))
    console.log(joinPattern(['#..#/#..#/#..#/#..#', '..../..../..../....', '..../..../..../....', '#..#/#..#/#..#/#..#']));
    // const iterations = 6;
    // let pattern = '.#./..#/###';

    // for (let i = 0; i < iterations; i++) {
    //     let splitPatterns = splitPattern(pattern);
    //     let mappedPatterns = splitPatterns.map((p) => enhancements.get(p));
    //     pattern = joinPattern(mappedPatterns);
    // }

    // const answer = pattern.split('').filter((c) => c === '#').length;
    let answer = null;
    return { value: answer };
}
// 2249956 too low