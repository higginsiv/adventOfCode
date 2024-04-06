module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const VOWELS = ['a', 'e', 'i', 'o', 'u'];

    let numNiceStrings = 0;

    lines.forEach((x) => {
        if (!x.includes('ab') && !x.includes('cd') && !x.includes('pq') && !x.includes('xy')) {
            let vowelCount = 0;
            let hasDouble = false;

            let letters = x.split('');
            for (let i = 0; i < letters.length; i++) {
                if (!hasDouble && i > 0 && letters[i] == letters[i - 1]) {
                    hasDouble = true;
                }

                if (VOWELS.includes(letters[i])) {
                    vowelCount++;
                }

                if (hasDouble && vowelCount >= 3) {
                    numNiceStrings++;
                    break;
                }
            }
        }
    });
    const answer = numNiceStrings;
    return { value: answer };
}
