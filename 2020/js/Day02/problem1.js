module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const data = lines.map((x) => {
        x = x.replace('-', ' ');
        x = x.replace(':', '');
        x = x.split(' ');
        x[0] = parseInt(x[0]);
        x[1] = parseInt(x[1]);
        x[3] = x[3].split('');
        return x;
    });

    const answer = data.reduce((total, curr) => {
        const [min, max, letter, string] = curr;
        let appearances = 0;
        string.forEach((char) => {
            if (char === letter) {
                appearances++;
            }
        });
        return appearances >= min && appearances <= max ? total + 1 : total;
    }, 0);
    return { value: answer };
}
