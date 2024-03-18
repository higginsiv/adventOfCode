module.exports = { solve: solve };
const EOL = require('os').EOL;
const { floor } = Math;

function solve({ lines, rawData }) {
    let params = getParams(lines);
    let modelNumber = new Array(14).fill(9);

    while (true) {
        let z = 0;

        params.forEach((param, index) => {
            if (param.param1 === 1) {
                z = 26 * z + modelNumber[index] + param.param3;
            } else if (param.param1 === 26) {
                modelNumber[index] = (z % 26) + param.param2;
                z = floor(z / 26);
            }
        });

        if (modelNumber.some((digit) => digit < 0 || digit > 9)) {
            let index = modelNumber.length - 1;
            while (index >= 0) {
                if (params[index].param1 === 26) {
                    index--;
                    continue;
                } else {
                    modelNumber[index]--;
                    if (modelNumber[index] === 0) {
                        modelNumber[index] = 9;
                        index--;
                    } else {
                        break;
                    }
                }
            }
            continue;
        }

        if (z === 0) {
            break;
        }
    }

    const answer = modelNumber.join('');
    return { value: answer };
}

function getParams(lines) {
    let params = [];
    let p1 = 4;
    let p2 = 5;
    let p3 = 15;

    while (p1 < lines.length) {
        params.push({
            param1: Number(lines[p1].split(' ')[2]),
            param2: Number(lines[p2].split(' ')[2]),
            param3: Number(lines[p3].split(' ')[2]),
        });
        p1 += 18;
        p2 += 18;
        p3 += 18;
    }

    return params;
}
