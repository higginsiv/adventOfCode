import { Solution } from '#tools/solution.js';
import { min } from 'bigint-crypto-utils';

export default function solve({ lines, rawData }) {
    lines = lines.map((line) => line.split(',').map(Number));

    let answer = 0;
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    let edges = [];
    let verticalEdges = [];
    let horizontalEdges = [];

    for (let i = 1; i < lines.length; i++) {
        minX = Math.min(minX, lines[i][0], lines[i - 1][0]);
        maxX = Math.max(maxX, lines[i][0], lines[i - 1][0]);
        minY = Math.min(minY, lines[i][1], lines[i - 1][1]);
        maxY = Math.max(maxY, lines[i][1], lines[i - 1][1]);
        const from = lines[i - 1][0] <= lines[i][0] ? lines[i - 1] : lines[i];
        const to = lines[i - 1][0] > lines[i][0] ? lines[i - 1] : lines[i];
        edges.push({ from, to });
        if (from[0] === to[0]) {
            verticalEdges.push({ from, to });
        } else {
            horizontalEdges.push({ from, to });
        }
    }

    for (let i = 0; i < lines.length; i++) {
        for (let j = i + 1; j < lines.length; j++) {
            const deltaX = lines[i][0] - lines[j][0];
            const deltaY = lines[i][1] - lines[j][1];
            const area =
                (Math.abs(deltaX) + 1) *
                (Math.abs(deltaY) + 1);
            if (area > answer) {
                // Check other corners
                const corners = [[lines[i][0], lines[j][1]], [lines[j][0], lines[i][1]]];
                // const segments = [
                //     { from: lines[i], to: corners[0] },
                //     { from: lines[i], to: corners[1] },
                //     { from: lines[j], to: corners[0] },
                //     { from: lines[j], to: corners[1] },
                // ];
                // let crossesEdge = false;
                // for (let segment of segments) {
                //     let edgesToCheck = segment.from[0] === segment.to[0] ? horizontalEdges : verticalEdges;
                //     if (doesSegmentCrossEdges(segment, edgesToCheck)) {
                //         crossesEdge = true;
                //         break;
                //     }
                // }
                // if (crossesEdge) {
                //     continue;
                // }

                if (isPointInShape(corners[0][0], corners[0][1]) &&
                    isPointInShape(corners[1][0], corners[1][1])) {
                    answer = area;
                }
            }
        }
    }
    return new Solution(answer);

    function doesSegmentCrossEdges(segment, edges) {
        for (let edge of edges) {
            if (doSegmentsIntersect(segment, edge)) {
                return true;
            }
        }
        return false;
    }

    function isPointInShape(x, y) {
        if (lines.find(line => line[0] === x && line[1] === y)) {
            return true;
        }

        let ray = { from: [x, y], to: [x, maxY + 1] };
        let intersectionCount = 0;
        for (let edge of edges) {
            if (doSegmentsIntersect(edge, ray)) {
                intersectionCount++;
            }
        }
        return intersectionCount % 2 === 1;
    }

    function doSegmentsIntersect(segment1, segment2) {
        const x1 = segment1.from[0];
        const y1 = segment1.from[1];
        const x2 = segment1.to[0];
        const y2 = segment1.to[1];

        const x3 = segment2.from[0];
        const y3 = segment2.from[1];
        const x4 = segment2.to[0];
        const y4 = segment2.to[1];

        // // Rays are always vertical so we can't count intersections with vertical edges
        // if (x1 === x2) {
        //     return false
        // }

        if (x1 <= x3 && x2 > x4 && y3 < y1 && y4 > y2) {
            return true;
        }
        return false;
    }
}


// XxxxxxxxxX    X
// X        X    X
// X  XXXX  XXXXXX
// X  X  X       X
// X  XXXX  XXXXXX
// X        X    X
// XxxxxxxxxX    X