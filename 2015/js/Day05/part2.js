export default function solve({lines, rawData}) {
    let numNiceStrings = 0;

    lines.forEach((x) => {
        let letters = x.split('');
    
        let hasSandwich = false;
        let hasDoublePair = false;
    
        for (let i = 0; i < letters.length; i++) {
            if (!hasSandwich && i < letters.length - 2 && letters[i] == letters[i + 2]) {
                hasSandwich = true;
            }
    
            if (!hasDoublePair && i > 0) {
                let potentialDouble = letters[i - 1] + letters[i];
                if (x.lastIndexOf(potentialDouble) > i) {
                    hasDoublePair = true;
                }
            }
    
            if (hasSandwich && hasDoublePair) {
                numNiceStrings++;
                break;
            }
        }
    });

    const answer = numNiceStrings;
    return {value: answer};
}