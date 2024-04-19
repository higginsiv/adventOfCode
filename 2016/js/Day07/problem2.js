module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const abaRegex = /(\w)(?=(?!\1)(\w)\1)/g;

    const answer = lines.reduce((total, line) => {
        let bracketContent = line.match(/\[\w+\]/g) || [];
        let nonBracketContent = line.replace(/\[\w+\]/g, ' ').split(' ');

        let abaMatches = nonBracketContent.flatMap((part) => [...part.matchAll(abaRegex)]);

        if (
            abaMatches.some((match) => {
                let bab = match[2] + match[1] + match[2];
                return bracketContent.some((content) => content.includes(bab));
            })
        ) {
            total++;
        }
        return total;
    }, 0);

    return { value: answer };
}
