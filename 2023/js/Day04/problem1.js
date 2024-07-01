export default function solve({ lines, rawData }) {
    const answer = lines.reduce((acc, line) => {
        line = line.replace(/\s+/g, ' ');
        line = line.split(': ');
        let numbers = line[1].split(' | ');
        let winners = numbers[0].split(' ').map((x) => parseInt(x));
        let chances = numbers[1].split(' ').map((x) => parseInt(x));

        let winNum = 0;
        winners.forEach((winner) => {
            if (chances.includes(winner)) {
                winNum++;
            }
        });

        return acc + (winNum > 0 ? Math.pow(2, winNum - 1) : 0);
    }, 0);
    return { value: answer };
}
