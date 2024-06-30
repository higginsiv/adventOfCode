export default function solve({ lines, rawData }) {
    let priority = 0;
    lines.forEach((sack) => {
        let [comp1, comp2] = [sack.slice(0, sack.length / 2), sack.slice(sack.length / 2)];
        let misplacedType = comp1.split('').find((item) => {
            return comp2.indexOf(item) !== -1;
        });

        let offset = misplacedType == misplacedType.toUpperCase() ? 38 : 96;

        priority += misplacedType.charCodeAt(0) - offset;
    });
    return { value: priority };
}
