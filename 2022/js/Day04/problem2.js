export default function solve({ lines, rawData }) {
    const answer = lines.reduce((badPairs, currentPair) => {
        const pair = currentPair.split(',');
        const elf1 = pair[0].split('-').map((x) => parseInt(x));
        const elf2 = pair[1].split('-').map((x) => parseInt(x));

        if (
            (elf1[0] <= elf2[0] && elf1[1] >= elf2[0]) ||
            (elf1[0] >= elf2[0] && elf1[0] <= elf2[1])
        ) {
            badPairs++;
        }
        return badPairs;
    }, 0);
    return { value: answer };
}
