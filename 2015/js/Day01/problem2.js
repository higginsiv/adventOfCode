module.exports = { solve: solve };

function solve({ lines, rawData }) {
    let floor = 0;
    let answer;
    let data = rawData.split('');
    for (let i = 0; i < data.length; i++) {
        let dir = data[i];
        floor = dir === '(' ? floor + 1 : floor - 1;
        if (floor === -1) {
            answer = i + 1;
            break;
        }
    }

    return { value: answer };
}
