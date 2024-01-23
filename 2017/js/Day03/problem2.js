module.exports = {solve: solve};

function solve({lines, rawData}) {
    function getKey(x, y) {
        return `${x},${y}`;
    }
    
    let current = 0;
    const goal = parseInt(rawData);

    while (current < goal) {
        current++;
    }
    let answer;
    return {value: answer};
}

// n-1 + n-2 + n-5 + n-6