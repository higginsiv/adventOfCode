module.exports = {solve: solve};

function solve({lines, rawData}) {
    const ITERATIONS = 50;
    let data = rawData;
    
    for (let i = 0; i < ITERATIONS; i++) {
        data = data
            .match(/(\d)\1{0,}/g)
            .map((x) => x.length + x[0])
            .join('');
    }
    
    let answer = data.length;
    return {value: answer};
}