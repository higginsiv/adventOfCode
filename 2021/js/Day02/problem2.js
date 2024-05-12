module.exports = { solve: solve };

function solve({ lines, rawData }) {
    let horizontal = 0;
    let depth = 0;
    let aim = 0;

    lines.forEach((element) => {
        let movement = element.split(' ');
        if (movement[0] === 'forward') {
            horizontal += parseInt(movement[1]);
            depth += aim * parseInt(movement[1]);
        } else if (movement[0] === 'down') {
            aim += parseInt(movement[1]);
        } else if (movement[0] === 'up') {
            aim -= parseInt(movement[1]);
        }
    });

    const answer = horizontal * depth;
    return { value: answer };
}
