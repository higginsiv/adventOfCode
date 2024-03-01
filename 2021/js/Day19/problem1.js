module.exports = { solve: solve };
const { manhattanDistance3d } = require('../../../tools/math');
const MIN_MATCHES = 12;
const SCANNER = 's';
const BEACON = 'b';

let grid = new Map();
let used = new Set();
let total3 = 0;
const EOL = require('os').EOL;
function solve({ lines, rawData }) {
    let scanners = [];
    let scannerToRanges = new Map();

    rawData.split(EOL + EOL).forEach((scanner, index) => {
        let lines = scanner.split(EOL);
        lines.shift();
        let beacons = lines.map((beacon, index) => {
            beacon = beacon.match(/-?\d+/g).map(Number);
            // return { x: beacon[0], y: 0, z: 0 };
            // TODO undo this comment when adding more dimensions
            return { key: index, init: { x: beacon[0], y: beacon[1], z: beacon[2] } };
        });
        scanners.push({ beacons, shared: new Map(), key: index });
    });

    grid.set('0,0,0', SCANNER);
    scanners[0].beacons.forEach((beacon, index) => {
        grid.set(getKey(beacon.init), BEACON);
    });

    const totalBeaconSightings = scanners.reduce((acc, scanner) => acc + scanner.beacons.length, 0);
    console.log('totalBeaconSightings', totalBeaconSightings);
    getAllDistances(scanners);

    for (let i = 0; i < scanners.length; i++) {
        for (let j = i + 1; j < scanners.length; j++) {
            let sharedBeaconCount = findSharedBeacons(scanners[i], scanners[j]);
            // if (sharedBeaconCount >= MIN_MATCHES) {
            //     // console.log('scanner ', i, 'and scanner', j, 'share', sharedBeaconCount, 'beacons');
            //     // console.log('---', scanners[i].shared.get(scanners[j].key));
            // }
        }
    }

    scanners[0].actualLocation = { x: 0, y: 0, z: 0 };
    scanners[0].beacons.forEach((beacon) => {
        grid.set(getKey(beacon.init), BEACON);
    });

    for (let i = 0; i < scanners.length; i++) {
        for (let key of scanners[i].shared.keys()) {
            if (scanners[i].actualLocation != null && scanners[key].actualLocation != null) {
                continue;
            }
            alignScanners(scanners[i], scanners[key], grid);
        }
    }

    // TODO handle overlap that isn't 12 deep
    // for (let i = 0; i < scanners.length; i++) {
    //     for (let j = 0; j < scanners[i].beacons.length; j++) {
    //         let beacon = scanners[i].beacons[j];
    //         let key = getUniqueBeaconKey(scanners[i], beacon);
    //         if (!used.has(key)) {
    //             total3++;
    //         }
    //         used.add(key);
    //     }
    // }

    // console.log(total3);
    // printScanners(scanners);
    const answer = grid.size; //totalBeacons;
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

function findSharedBeacons(scanner1, scanner2) {
    let sharedBeaconCount = 0;
    let sharedBeacons1 = [];
    let sharedBeacons2 = [];
    scanner1.beacons.forEach((beacon1, index) => {
        scanner2.beacons.forEach((beacon2, index) => {
            let overlappingDistances = 0;
            for (let i = 0; i < beacon1.distances.length; i++) {
                if (beacon1.distances.includes(beacon2.distances[i])) {
                    overlappingDistances++;
                }
            }
            if (overlappingDistances >= MIN_MATCHES - 1) {
                // if (!used.has(getUniqueBeaconKey(scanner1, beacon1)) && !used.has(getUniqueBeaconKey(scanner2, beacon2))) {
                sharedBeaconCount++;
                // }
                sharedBeacons1.push(beacon1);
                sharedBeacons2.push(beacon2);
            }
        });
    });
    if (sharedBeaconCount >= MIN_MATCHES) {
        sharedBeacons1.forEach((beacon) => {
            let key = getUniqueBeaconKey(scanner1, beacon);
            if (!used.has(key)) {
                total3++;
            }
            used.add(key);
        });
        sharedBeacons2.forEach((beacon) => {
            used.add(getUniqueBeaconKey(scanner2, beacon));
        });

        scanner1.shared.set(scanner2.key, sharedBeacons1);
        scanner2.shared.set(scanner1.key, sharedBeacons2);
    }
    // return sharedBeaconCount;
}

function getKey(point) {
    return `${point.x},${point.y},${point.z}`;
}

function getUniqueBeaconKey(scanner, beacon) {
    return `${scanner.key},${beacon.key}`;
}

function alignScanners(alignedScanner, crazyScanner, grid) {
    // TODO this needs to rotate beacons
    let rotations = getRotations(crazyScanner.init);
    for (let i = 0; i < rotations.length; i++) {
        crazyScanner.rotation = rotations[i];
        let validRotation = isValidRotation(alignedScanner, crazyScanner);
        if (validRotation) {
            // TODO put all points in grid including non matched beacons and scanner
            // using translation and rotation
            crazyScanner.init = crazyScanner.rotation;

            crazyScanner.scannerLocation = {
                x:
                    alignedScanner.shared.get(crazyScanner.key)[0].x -
                    crazyScanner.shared.get(alignedScanner.key)[0].x,
                y:
                    alignedScanner.shared.get(crazyScanner.key)[0].y -
                    crazyScanner.shared.get(alignedScanner.key)[0].y,
                z:
                    alignedScanner.shared.get(crazyScanner.key)[0].z -
                    crazyScanner.shared.get(alignedScanner.key)[0].z,
            };
            addBeaconsToGrid(crazyScanner, grid);
            // TODO what to return? if anything
            return rotatedScanner;
        }
    }
    return null;
}

function addBeaconsToGrid(scanner, grid) {
    scanner.beacons.forEach((beacon) => {
        let actualLocation = {
            x: beacon.init.x + scanner.scannerLocation.x,
            y: beacon.init.y + scanner.scannerLocation.y,
            z: beacon.init.z + scanner.scannerLocation.z,
        };
        grid.set(getKey(actualLocation), BEACON);
    });
}

// TODO should this take in beacons instead of scanners
// TODO save rotated beacons to scanner
function isValidRotation(alignedScanner, rotatedScanner) {
    let beaconsAlignedShares = alignedScanner.shared.get(rotatedScanner.key);
    let beaconsRotatedShares = rotatedScanner.shared.get(alignedScanner.key);
    let goalTranslation;

    for (let r = 0; r < 24; r++) {
        for (let i = 0; i < beaconsAlignedShares.length; i++) {
            let rotatedBeacon = rotatedScanner.beacons[beaconsRotatedShares[i]];
            let translation = {
                x:
                    alignedScanner.beacons[beaconsAlignedShares[i]].x -
                    rotatedBeacon.x,
                y:
                    alignedScanner.beacons[beaconsAlignedShares[i]].y -
                    rotatedBeacon.y,
                z:
                    alignedScanner.beacons[beaconsAlignedShares[i]].z -
                    rotatedBeacon.z,
            };

            if (!goalTranslation) {
                goalTranslation = translation;
            } else {
                if (
                    goalTranslation.x !== translation.x ||
                    goalTranslation.y !== translation.y ||
                    goalTranslation.z !== translation.z
                ) {
                    continue
                }
            }
        }
        return true;
    }

    // TODO return relative translation so that crazy scanner can become aligned
    return false; //goalTranslation;
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

function getRotations({ x, y, z }) {
    return [
        { x, y, z },
        { x, y: z, z: -y },
        { x, y: -y, z: -z },
        { x, y: -z, z: y },
        { x: -x, y: -y, z },
        { x: -x, y: z, z: y },
        { x: -x, y, z: -z },
        { x: -x, y: -z, z: -y },
        { x: y, y: z, z: x },
        { x: y, y: x, z: -z },
        { x: y, y: -z, z: -x },
        { x: y, y: -x, z },
        { x: -y, y: -z, z: x },
        { x: -y, y: x, z },
        { x: -y, y: z, z: -x },
        { x: -y, y: -x, z: -z },
        { x: z, y: x, z: y },
        { x: z, y, z: -x },
        { x: z, y: -x, z: -y },
        { x: z, y: -y, z: x },
        { x: -z, y: -x, z: y },
        { x: -z, y, z: x },
        { x: -z, y: x, z: -y },
        { x: -z, y: -y, z: -x },
    ];
}
// 456 too low
