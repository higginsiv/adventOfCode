export default function solve({ lines, rawData }) {
    const data = rawData.split('');

    let answer;

    const groupSize = 4;
    for (let i = 0; i < data.length; i++) {
        if (
            data
                .slice(i, i + groupSize)
                .every(
                    (current, index, currentGroup) => currentGroup.lastIndexOf(current) === index,
                )
        ) {
            answer = i + groupSize;
            break;
        }
    }
    return { value: answer };
}
