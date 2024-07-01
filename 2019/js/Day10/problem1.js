import { getGCD } from '../../../tools/math.js';
export default function solve({ lines, rawData }) {
    const [ASTEROID, EMPTY] = ['#', '.'];
    const DELIM = '|';

    let slopes = new Set();
    const data = lines.map((x) => x.split(''));
    for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data[0].length; x++) {
            if (x === 0 && y === 0) {
                continue;
            } else if (x === 0) {
                slopes.add(0 + DELIM + 1);
            } else if (y === 0) {
                slopes.add(1 + DELIM + 0);
            } else {
                let gcd = getGCD(x, y);
                let reducedX = x / gcd;
                let reducedY = y / gcd;
                slopes.add(reducedX + DELIM + reducedY);
                slopes.add(-reducedX + DELIM + reducedY);
            }
        }
    }

    let stroidToStroids = new Map();
    for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data[0].length; x++) {
            if (data[y][x] === ASTEROID) {
                let asteroidsInView = 0;
                slopes.forEach((slope) => {
                    let [slopeX, slopeY] = slope.split(DELIM).map((p) => parseInt(p));
                    asteroidsInView += findFirstOnSlope(x + slopeX, y + slopeY, slopeX, slopeY);
                    asteroidsInView += findFirstOnSlope(x - slopeX, y - slopeY, -slopeX, -slopeY);
                    stroidToStroids.set(x + DELIM + y, asteroidsInView);
                });
            }
        }
    }

    const answer = [...stroidToStroids.values()].sort((a, b) => b - a)[0];

    function findFirstOnSlope(x, y, slopeX, slopeY) {
        if (y >= data.length || x >= data[0].length || y < 0 || x < 0) {
            return 0;
        } else if (data[y][x] === ASTEROID) {
            return 1;
        } else {
            return findFirstOnSlope(x + slopeX, y + slopeY, slopeX, slopeY);
        }
    }
    return { value: answer };
}
