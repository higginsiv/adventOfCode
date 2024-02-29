module.exports = { solve: solve };
const { manhattanDistance3d } = require('../../../tools/math');
const MIN_MATCHES = 12;
let grid = new Map();
const EOL = require('os').EOL;
function solve({ lines, rawData }) {

    let scanners = [];
    let scannerToRanges = new Map();

    rawData.split(EOL + EOL).forEach((scanner, index) => {
        let lines = scanner.split(EOL);
        lines.shift();
        beacons = lines.map((beacon) => {
            beacon = beacon.match(/-?\d+/g).map(Number);
            // return { x: beacon[0], y: 0, z: 0 };
            // TODO undo this comment when adding more dimensions
            return {init: {x: beacon[0], y: beacon[1], z: beacon[2]}};
        });
        scanners.push({ beacons });
    });

    const totalBeaconSightings = scanners.reduce((acc, scanner) => acc + scanner.beacons.length, 0);
    console.log('totalBeaconSightings', totalBeaconSightings);
    let totalBeacons = totalBeaconSightings;
    let total2 = totalBeaconSightings;
    getAllDistances(scanners);

    for (let i = 0; i < scanners.length; i++) {
        for (let j = i + 1; j < scanners.length; j++) {
            let sharedBeaconCount = findSharedBeaconCount(scanners[i], scanners[j]);
            // if (sharedBeaconCount >= MIN_MATCHES) {
                totalBeacons -= sharedBeaconCount;
            // }
        }
    }
    for (let i = 0; i < scanners.length; i++) {
        for (let j = scanners[i].beacons.length - 1; j >= 0; j--) {
            total2 -= scanners[i].beacons[j].shared ? 1 : 0;
        }
    }
    console.log(total2)
    // printScanners(scanners);
    const answer = totalBeacons;
    return { value: answer };
}

function getAllDistances(scanners) {
    scanners.forEach((scanner) => {
        scanner.beacons.forEach((beacon) => {
            beacon.distances = [];
            scanner.beacons.forEach((beacon2) => {
                if (beacon !== beacon2) {
                    beacon.distances.push(manhattanDistance3d(beacon.init, beacon2.init));
                }
            });
        });
    });
}

function findSharedBeaconCount(scanner1, scanner2) {
    let sharedBeaconCount = 0;
    scanner1.beacons.forEach((beacon1, index) => {
        scanner2.beacons.forEach((beacon2, index) => {
            let overlappingDistances = 0;
            for (let i = 0; i < beacon1.distances.length; i++) {
                if (beacon1.distances.includes(beacon2.distances[i])) {
                    beacon2.tentativeReal = {x: beacon1.init.x, y: beacon1.init.y, z: beacon1.init.z};
                    overlappingDistances++;
                }
            }
            if (overlappingDistances >= MIN_MATCHES - 1) {
                // beacon1.shared = true;
                // beacon2.shared = true;
                sharedBeaconCount++;
                beacon2.real = {x: beacon2.tentativeReal.x, y: beacon2.tenativeReal.y, z: beacon2.tentativeReal.z};
            }
        });
    });
    return sharedBeaconCount;
}

function alignScanners(scanner1, scanner2, grid) {

}
function printScanners(scanners) {
    scanners.forEach((scanner, index) => {
        console.log('scanner', index);
        scanner.beacons.forEach((beacon, index) => {
            console.log('beacon.distances', beacon.distances);
        });
        console.log();
    });
}

// 456 too low
