module.exports = { solve: solve };
const { manhattanDistance3d } = require('../../../tools/math');
const EOL = require('os').EOL;

const MIN_MATCHES = 12;

function solve({ lines, rawData }) {
    let scanners = [];

    rawData.split(EOL + EOL).forEach((scanner, index) => {
        let lines = scanner.split(EOL);
        lines.shift();
        let beacons = lines.map((beacon, index) => {
            beacon = beacon.match(/-?\d+/g).map(Number);
            return { key: index, init: { x: beacon[0], y: beacon[1], z: beacon[2] } };
        });
        scanners.push({ beacons, shared: new Map(), key: index });
    });

    scanners[0].beacons.forEach((beacon, index) => {
        beacon.actualLocation = { x: beacon.init.x, y: beacon.init.y, z: beacon.init.z };
    });

    getAllDistances(scanners);

    for (let i = 0; i < scanners.length; i++) {
        for (let j = i + 1; j < scanners.length; j++) {
            findSharedBeacons(scanners[i], scanners[j]);
        }
    }

    scanners[0].actualLocation = { x: 0, y: 0, z: 0 };

    let unaligned = scanners.length - 1;
    while (unaligned > 0) {
        for (let i = 0; i < scanners.length; i++) {
            for (let key of scanners[i].shared.keys()) {
                if (scanners[i].actualLocation != null && scanners[key].actualLocation != null) {
                    continue;
                }
                if (scanners[i].actualLocation == null && scanners[key].actualLocation == null) {
                    continue;
                }
                if (scanners[i].actualLocation != null) {
                    alignScanners(scanners[i], scanners[key]);
                    unaligned--;
                } else if (scanners[key].actualLocation != null) {
                    alignScanners(scanners[key], scanners[i]);
                    unaligned--;
                }
            }
        }
    }

    let furthest = 0;
    for (let i = 0; i < scanners.length; i++) {
        for (let j = i + 1; j < scanners.length; j++) {
            let distance = manhattanDistance3d(
                scanners[i].actualLocation,
                scanners[j].actualLocation,
            );
            if (distance > furthest) {
                furthest = distance;
            }
        }
    }

    const answer = furthest;
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
    for (let i = 0; i < scanner1.beacons.length; i++) {
        let beacon1 = scanner1.beacons[i];
        for (let j = 0; j < scanner2.beacons.length; j++) {
            let beacon2 = scanner2.beacons[j];
            let overlappingDistances = 0;
            for (let k = 0; k < beacon1.distances.length; k++) {
                if (overlappingDistances + beacon1.distances.length - k < MIN_MATCHES - 1) {
                    break;
                }
                if (beacon2.distances.includes(beacon1.distances[k])) {
                    overlappingDistances++;
                }
            }
            if (overlappingDistances >= MIN_MATCHES - 1) {
                sharedBeaconCount++;
                sharedBeacons1.push(beacon1);
                sharedBeacons2.push(beacon2);
            }
        }
    }

    if (sharedBeaconCount >= MIN_MATCHES) {
        scanner1.shared.set(scanner2.key, sharedBeacons1);
        scanner2.shared.set(scanner1.key, sharedBeacons2);
    }
}

function getKey(point) {
    return `${point.x},${point.y},${point.z}`;
}

function alignScanners(alignedScanner, unalignedScanner) {
    const hasValidRotation = findValidRotation(alignedScanner, unalignedScanner);
    if (hasValidRotation) {
        let newlyAlignedBeacon =
            unalignedScanner.beacons[unalignedScanner.shared.get(alignedScanner.key)[0].key]
                .rotation;
        let alignedBeacon =
            alignedScanner.beacons[alignedScanner.shared.get(unalignedScanner.key)[0].key]
                .actualLocation;

        unalignedScanner.actualLocation = {
            x: alignedBeacon.x - newlyAlignedBeacon.x,
            y: alignedBeacon.y - newlyAlignedBeacon.y,
            z: alignedBeacon.z - newlyAlignedBeacon.z,
        };
        populateBeaconActualLocation(unalignedScanner);
    }
}

function populateBeaconActualLocation(scanner) {
    scanner.beacons.forEach((beacon) => {
        let actualLocation = {
            x: beacon.rotation.x + scanner.actualLocation.x,
            y: beacon.rotation.y + scanner.actualLocation.y,
            z: beacon.rotation.z + scanner.actualLocation.z,
        };
        beacon.actualLocation = actualLocation;
    });
}

function findValidRotation(alignedScanner, rotatingScanner) {
    let beaconsAlignedShares = alignedScanner.shared.get(rotatingScanner.key);
    let beaconsRotatingShares = rotatingScanner.shared.get(alignedScanner.key);

    let found;
    for (let r = 0; r < 24; r++) {
        found = false;
        let goalPotentialLocation = null;

        for (let i = 0; i < beaconsAlignedShares.length; i++) {
            let beacon = rotatingScanner.beacons[beaconsRotatingShares[i].key];
            let rotatedBeacon = getRotations(beacon.init)[r];
            let potentialScannerLocation = {
                x: beaconsAlignedShares[i].actualLocation.x - rotatedBeacon.x,
                y: beaconsAlignedShares[i].actualLocation.y - rotatedBeacon.y,
                z: beaconsAlignedShares[i].actualLocation.z - rotatedBeacon.z,
            };

            if (goalPotentialLocation == null) {
                goalPotentialLocation = potentialScannerLocation;
            } else {
                if (
                    goalPotentialLocation.x !== potentialScannerLocation.x ||
                    goalPotentialLocation.y !== potentialScannerLocation.y ||
                    goalPotentialLocation.z !== potentialScannerLocation.z
                ) {
                    found = false;
                    break;
                }
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
