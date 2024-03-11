module.exports = {solve: solve};

function solve({lines, rawData}) {
    let grid = new Map();
    let hallwayLines = lines[1].split('').filter(x => x === '.').length;
    console.log(hallwayLines);
    let lettersTop = lines[2].match(/[A-Z]/g).forEach();
    let lettersBottom = lines[3].match(/[A-Z]/g);
    console.log(lettersTop);
    console.log(lettersBottom);
    
    const answer = null;
    return {value: answer};
}