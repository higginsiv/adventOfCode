module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const [CHILDREN, CATS, SAMOYEDS, POMS, AKITAS, VIZS, GOLDFISH, TREES, CARS, PERFS] = [
        3, 7, 2, 3, 0, 0, 5, 3, 2, 1,
    ];
    const sues = lines.map((x) => {
        x = x.replaceAll(':', '');
        x = x.replaceAll(',', '');
        x = x.split(' ');

        let sue = {};
        sue[x[2]] = parseInt(x[3]);
        sue[x[4]] = parseInt(x[5]);
        sue[x[6]] = parseInt(x[7]);

        return sue;
    });

    let info = new Map();
    info.set('children', CHILDREN);
    info.set('cats', CATS);
    info.set('samoyeds', SAMOYEDS);
    info.set('pomeranians', POMS);
    info.set('akitas', AKITAS);
    info.set('vizslas', VIZS);
    info.set('goldfish', GOLDFISH);
    info.set('trees', TREES);
    info.set('cars', CARS);
    info.set('perfumes', PERFS);

    let answer;

    for (let i = 0; i < sues.length; i++) {
        let allClear = true;

        Object.keys(sues[i]).forEach((key) => {
            let sueValue = sues[i][key];
            let infoValue = info.get(key);
            if (key == 'cats' || key == 'trees') {
                if (sueValue <= infoValue) {
                    allClear = false;
                }
            } else if (key == 'pomeranians' || key == 'goldfish') {
                if (sueValue >= infoValue) {
                    allClear = false;
                }
            } else if (sues[i][key] != info.get(key)) {
                allClear = false;
            }
        });

        if (allClear) {
            answer = i + 1;
            break;
        }
    }
    return { value: answer };
}
