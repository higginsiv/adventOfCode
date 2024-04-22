module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const data = lines.map((x) => parseInt(x));
    const GOAL_NUM = 2020;
    let answer;

    for (let i = 0; i < data.length; i++) {
        const num = data[i];
        const antiNum = GOAL_NUM - num;
        if (data.includes(antiNum)) {
            answer = num * antiNum;
            break;
        }
    }
    return { value: answer };
}
