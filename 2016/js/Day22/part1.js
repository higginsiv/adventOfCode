export default function solve({ lines, rawData }) {
    lines.splice(0, 2);

    lines = lines.map((line) => {
        let matches = line.match(/\d+/g);
        return {
            used: parseInt(matches[3]),
            avail: parseInt(matches[4]),
        };
    });

    let viablePairs = 0;

    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines.length; j++) {
            if (i === j) {
                continue;
            }

            if (lines[i].used === 0) {
                continue;
            }

            if (lines[i].used <= lines[j].avail) {
                viablePairs++;
            }
        }
    }

    return { value: viablePairs };
}
