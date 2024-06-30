export default function solve({ lines, rawData }) {
    let counts = lines.reduce(
        (acc, line) => {
            let letterCount = {};
            for (let i = 0; i < line.length; i++) {
                let letter = line[i];
                if (!letterCount[letter]) {
                    letterCount[letter] = 0;
                }
                letterCount[letter]++;
            }
            if (Object.values(letterCount).includes(2)) {
                acc.twoCount++;
            }
            if (Object.values(letterCount).includes(3)) {
                acc.threeCount++;
            }
            return acc;
        },
        { twoCount: 0, threeCount: 0 },
    );

    const answer = counts.twoCount * counts.threeCount;
    return { value: answer };
}
