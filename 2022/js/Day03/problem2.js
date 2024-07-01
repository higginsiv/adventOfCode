export default function solve({ lines, rawData }) {
    let priority = 0;
    for (let i = 0; i < lines.length; i += 3) {
        let badgeType = lines[i].split('').find((item) => {
            return lines[i + 1].indexOf(item) !== -1 && lines[i + 2].indexOf(item) !== -1;
        });

        let offset = badgeType == badgeType.toUpperCase() ? 38 : 96;
        priority += badgeType.charCodeAt(0) - offset;
    }
    return { value: priority };
}
