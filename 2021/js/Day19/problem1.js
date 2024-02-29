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
            let sharedBeaconCount = findSharedBeaconCount(scanners[i], scanners[j]);
            if (sharedBeaconCount >= MIN_MATCHES) {
                // console.log('scanner ', i, 'and scanner', j, 'share', sharedBeaconCount, 'beacons');
                // console.log('---', scanners[i].shared.get(scanners[j].key));
            }
        }
    }

    // TODO handle overlap that isn't 12 deep
    for (let i = 0; i < scanners.length; i++) {
        for (let j = 0; j < scanners[i].beacons.length; j++) {
            let beacon = scanners[i].beacons[j];
            let key = getUniqueBeaconKey(scanners[i], beacon);
            if (!used.has(key)) {
                total3++;
            }
            used.add(key);
        }
    }

    console.log(total3);
    // printScanners(scanners);
    const answer = 0 //totalBeacons;
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
        // scanner2.shared.set(scanner1.key, sharedBeacons2);
    }
    return sharedBeaconCount;
}

function getKey(point) {
    return `${point.x},${point.y},${point.z}`;
}

function getUniqueBeaconKey(scanner, beacon) {
    return `${scanner.key},${beacon.key}`;
}

function alignScanners(scanner1, scanner2, grid) {}
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
