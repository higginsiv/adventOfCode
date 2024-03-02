module.exports = { solve: solve };
const { get } = require('http');
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

    // grid.set('0,0,0', SCANNER);
    scanners[0].beacons.forEach((beacon, index) => {
        beacon.actualLocation = { x: beacon.init.x, y: beacon.init.y, z: beacon.init.z };
        grid.set(getKey(beacon.init), BEACON);
    });

    const totalBeaconSightings = scanners.reduce((acc, scanner) => acc + scanner.beacons.length, 0);
    // console.log('totalBeaconSightings', totalBeaconSightings);
    getAllDistances(scanners);

    for (let i = 0; i < scanners.length; i++) {
        for (let j = i + 1; j < scanners.length; j++) {
            findSharedBeacons(scanners[i], scanners[j]);
        }
    }

    scanners[0].actualLocation = { x: 0, y: 0, z: 0 };
    scanners[0].beacons.forEach((beacon) => {
        grid.set(getKey(beacon.init), BEACON);
    });

    // TODO make this efficient
    let unaligned = scanners.filter((scanner) => scanner.actualLocation == null);
    while (unaligned.length > 0) {
        for (let i = 0; i < scanners.length; i++) {
            for (let key of scanners[i].shared.keys()) {
                if (scanners[i].actualLocation != null && scanners[key].actualLocation != null) {
                    continue;
                }
                if (scanners[i].actualLocation == null && scanners[key].actualLocation == null) {
                    continue;
                }
                if (scanners[i].actualLocation != null) {
                    alignScanners(scanners[i], scanners[key], grid);
                } else if (scanners[key].actualLocation != null) {
                    alignScanners(scanners[key], scanners[i], grid);
                }
            }
        }
        unaligned = scanners.filter((scanner) => scanner.actualLocation == null);
    }

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
                if (beacon2.distances.includes(beacon1.distances[i])) {
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

function alignScanners(alignedScanner, unalignedScanner, grid) {
    const hasValidRotation = findValidRotation(alignedScanner, unalignedScanner);
    if (hasValidRotation) {
        let newlyAlignedBeacon =
            unalignedScanner.beacons[unalignedScanner.shared.get(alignedScanner.key)[0].key]
                .rotation;
        let alignedBeacon =
            alignedScanner.beacons[alignedScanner.shared.get(unalignedScanner.key)[0].key]
                .actualLocation;

        // console.log(alignedScanner.key, unalignedScanner.key)
        // console.log('newlyAlignedBeacon', newlyAlignedBeacon)
        // console.log('alignedBeacon', alignedBeacon)
        unalignedScanner.actualLocation = {
            x: alignedBeacon.x - newlyAlignedBeacon.x,
            y: alignedBeacon.y - newlyAlignedBeacon.y,
            z: alignedBeacon.z - newlyAlignedBeacon.z,
        };
        addBeaconsToGrid(unalignedScanner, grid);
    }
}

function addBeaconsToGrid(scanner, grid) {
    // console.log(scanner.key, scanner.actualLocation);
    scanner.beacons.forEach((beacon) => {
        let actualLocation = {
            x: beacon.rotation.x + scanner.actualLocation.x,
            y: beacon.rotation.y + scanner.actualLocation.y,
            z: beacon.rotation.z + scanner.actualLocation.z,
        };
        beacon.actualLocation = actualLocation;
        const key = getKey(actualLocation);
        // console.log(key)
        grid.set(key, BEACON);
    });
}

function findValidRotation(alignedScanner, rotatingScanner) {
    let beaconsAlignedShares = alignedScanner.shared.get(rotatingScanner.key);
    let beaconsRotatingShares = rotatingScanner.shared.get(alignedScanner.key);

    let found;
    for (let r = 0; r < 24; r++) {
        found = false;
        let goalTranslation = null;

        for (let i = 0; i < beaconsAlignedShares.length; i++) {
            // TODO a lot of this is convoluted because I thought I was saving a key not an actual beacon
            let beacon = rotatingScanner.beacons[beaconsRotatingShares[i].key];
            let rotatedBeacon = getRotations(beacon.init)[r];
            // TODO comparing these translations doesn't help and alawys returns true for the first (no) rotation
            // console.log(alignedScanner.beacons[beaconsAlignedShares[i].key])
            let translation = {
                x:
                    alignedScanner.beacons[beaconsAlignedShares[i].key].actualLocation.x -
                    rotatedBeacon.x,
                y:
                    alignedScanner.beacons[beaconsAlignedShares[i].key].actualLocation.y -
                    rotatedBeacon.y,
                z:
                    alignedScanner.beacons[beaconsAlignedShares[i].key].actualLocation.z -
                    rotatedBeacon.z,
            };

            if (goalTranslation == null) {
                goalTranslation = translation;
            } else {
                if (
                    goalTranslation.x !== translation.x ||
                    goalTranslation.y !== translation.y ||
                    goalTranslation.z !== translation.z
                ) {
                    break;
                }
                // console.log('rotation', r)
                found = true;
            }
        }

        if (found) {
            for (let i = 0; i < rotatingScanner.beacons.length; i++) {
                let beacon = rotatingScanner.beacons[i];
                beacon.rotation = getRotations(beacon.init)[r];
            }
            break;
        }
    }

    return found;
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

// -x, y, -z
