export default function solve({ lines, rawData }) {
    for (let i = 0; i < lines.length; i++) {
        for (let j = 1; j < lines.length; j++) {
            let differences = 0;
            for (let k = 0; k < lines[i].length; k++) {
                if (lines[i][k] !== lines[j][k]) {
                    differences++;
                    if (differences > 1) {
                        break;
                    }
                }
            }
            if (differences === 1) {
                const answer = lines[i]
                    .split('')
                    .filter((c, i) => c === lines[j][i])
                    .join('');
                return { value: answer };
            }
        }
    }
}
