module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const DATA = lines.reduce((total, line) => {
        line.split('').forEach((char, index) => {
            if (total[index] == null) {
                total[index] = {};
            }
            if (total[index][char] == null) {
                total[index][char] = 1;
            } else {
                total[index][char]++;
            }
        });

        return total;
    }, []);

    let answer = '';
    DATA.forEach((char) => {
        let min = Infinity;
        let letter = '';
        Object.keys(char).forEach((key) => {
            if (char[key] < min) {
                min = char[key];
                letter = key;
            }
        });
        answer += letter;
    });
    return { value: answer };
}
