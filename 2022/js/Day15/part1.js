export default function solve({ lines, rawData }) {
    const { abs } = Math;
    const data = lines.map((x) => {
        x = x.replace('Sensor at x=', '');
        x = x.replace(': closest beacon is at x=', ' ');
        x = x.replaceAll(', y=', ' ');
        return x.split(' ').map((x) => parseInt(x));
    });
    let rowToCheck = 2000000;
    // let rowToCheck = 10;
    let invalidPoints = new Set();
    let beaconsOnRow = new Set();

    data.forEach((x, index) => {
        const [sensorX, sensorY, beaconX, beaconY] = x;
        if (beaconY === rowToCheck) {
            beaconsOnRow.add(beaconX);
        }
        const distance = getDistance(sensorX, sensorY, beaconX, beaconY);

        if (sensorY < rowToCheck && sensorY + distance >= rowToCheck) {
            let rowSpan = sensorY + distance - rowToCheck;
            for (let i = sensorX - rowSpan; i <= sensorX + rowSpan; i++) {
                if (!beaconsOnRow.has(i)) {
                    invalidPoints.add(i);
                }
            }
        }

        if (sensorY > rowToCheck && sensorY - distance <= rowToCheck) {
            let rowSpan = rowToCheck - (sensorY - distance);
            for (let i = sensorX - rowSpan; i <= sensorX + rowSpan; i++) {
                if (!beaconsOnRow.has(i)) {
                    invalidPoints.add(i);
                }
            }
        }

        if (sensorY === rowToCheck) {
            for (let i = 1; i <= distance; i++) {
                if (!beaconsOnRow.has(sensorX - i)) {
                    invalidPoints.add(sensorX - i);
                }
                if (!beaconsOnRow.has(sensorX + i)) {
                    invalidPoints.add(sensorX + i);
                }
            }
        }
    });

    function getDistance(x, y, a, b) {
        return abs(x - a) + abs(y - b);
    }

    const answer = invalidPoints.size;
    return { value: answer };
}
