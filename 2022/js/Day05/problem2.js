export default function solve({ lines, rawData }) {
    const data = lines;

    let crateData = [];
    data.slice(0, data.indexOf('') - 1)
        .map((x) => {
            let ret = [];
            x = x.replaceAll('[', '').replaceAll(']', '');

            let spaces = 0;
            for (let i = 0; i < x.length; i++) {
                if (x[i] != ' ') {
                    if (spaces > 0) {
                        for (let j = 0; j < (spaces - 1) / 4; j++) {
                            ret.push(' ');
                        }
                    }

                    ret.push(x[i]);
                    spaces = 0;
                } else {
                    spaces++;
                }
            }
            if (spaces > 0) {
                ret.push(' ');
            }
            return ret;
        })
        .forEach((rawRow) => {
            rawRow.forEach((crate, index) => {
                if (crateData[index] == null) {
                    crateData[index] = [];
                }
                if (crate != ' ') {
                    crateData[index].unshift(crate);
                }
            });
        });

    let movData = data.slice(data.indexOf('') + 1).map((x) =>
        x
            .replace('move ', '')
            .replace(' from ', ',')
            .replace(' to ', ',')
            .split(',')
            .map((x) => parseInt(x)),
    );

    movData.forEach((instruction) => {
        let [amount, from, to] = instruction;

        crateData[to - 1].push(...crateData[from - 1].slice(crateData[from - 1].length - amount));
        crateData[from - 1] = crateData[from - 1].slice(0, crateData[from - 1].length - amount);
    });

    const answer = crateData.reduce((crateTops, currentCol) => (crateTops += currentCol.pop()), '');
    return { value: answer };
}
