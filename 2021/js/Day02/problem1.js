export default function solve({ lines, rawData }) {
    let horizontal = 0;
    let depth = 0;

    lines.forEach(function (element) {
        let movement = element.split(' ');
        if (movement[0] === 'forward') {
            horizontal += parseInt(movement[1]);
        } else if (movement[0] === 'down') {
            depth += parseInt(movement[1]);
        } else if (movement[0] === 'up') {
            depth -= parseInt(movement[1]);
        }
    });

    const answer = horizontal * depth;
    return { value: answer };
}
