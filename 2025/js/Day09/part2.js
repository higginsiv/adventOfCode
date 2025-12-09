import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    let log = false;

    lines = lines.map((line) => line.split(',').map(Number));
    lines.push(lines[0]); // Close the shape

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

    let areas = [];
    for (let i = 0; i < lines.length; i++) {
        for (let j = i + 1; j < lines.length; j++) {
            const deltaX = lines[i][0] - lines[j][0];
            const deltaY = lines[i][1] - lines[j][1];
            const area = (Math.abs(deltaX) + 1) * (Math.abs(deltaY) + 1);
            areas.push({ area, i, j });
        }
    }

    areas.sort((a, b) => b.area - a.area);

    for (let { area, i, j } of areas) {
        const otherCorners = [
            [lines[i][0], lines[j][1]],
            [lines[j][0], lines[i][1]],
        ];

        // Check if other corners are inside the shape. Red corners are trivially in the shape
        if (!areCornersInShape(otherCorners)) {
            continue;
        }

        // Check if rectangle edges cross any shape edges
        const rectangleEdges = getOrderedRectangleEdges([lines[i], lines[j], ...otherCorners]);

        if (doRectangleEdgesCrossShapeEdges(rectangleEdges)) {
            continue;
        }

        answer = area;
        break;
    }

    return new Solution(answer);

    function doSegmentsIntersect(segment1, checkingHorizontal) {
        const edges = checkingHorizontal ? horizontalEdges : verticalEdges;

        for (let edge of edges) {
            const segmentX1 = segment1.from[0];
            const segmentY1 = segment1.from[1];
            const segmentX2 = segment1.to[0];
            const segmentY2 = segment1.to[1];

            const edgeX1 = edge.from[0];
            const edgeY1 = edge.from[1];
            const edgeX2 = edge.to[0];
            const edgeY2 = edge.to[1];

            if (checkingHorizontal) {
                if (segmentX1 <= edgeX1 || segmentX2 >= edgeX2) {
                    continue;
                }

                if (
                    (segmentY1 < edgeY1 && segmentY2 < edgeY1) ||
                    (segmentY1 > edgeY1 && segmentY2 > edgeY1)
                ) {
                    continue;
                }

                if (segmentY1 === edgeY1 || segmentY2 === edgeY1) continue;

                const abovePoint = [segment1.from[0], edgeY1 - 1];
                const belowPoint = [segment1.from[0], edgeY1 + 1];
                if (
                    isPointInShape(abovePoint[0], abovePoint[1]) &&
                    isPointInShape(belowPoint[0], belowPoint[1])
                ) {
                    continue;
                }

                return true;
            } else {
                if (segmentY1 <= edgeY1 || segmentY2 >= edgeY2) {
                    continue;
                }
                if (
                    (segmentX1 < edgeX1 && segmentX2 < edgeX1) ||
                    (segmentX1 > edgeX1 && segmentX2 > edgeX1)
                ) {
                    continue;
                }

                if (segmentX1 === edgeX1 || segmentX2 === edgeX1) continue;

                const leftPoint = [edgeX1 - 1, segment1.from[1]];
                const rightPoint = [edgeX1 + 1, segment1.from[1]];
                if (
                    isPointInShape(leftPoint[0], leftPoint[1]) &&
                    isPointInShape(rightPoint[0], rightPoint[1])
                ) {
                    continue;
                }

                return true;
            }
        }
        return false;
    }

    function doRectangleEdgesCrossShapeEdges(rectangleEdges) {
        for (let rectangleEdge of rectangleEdges) {
            const checkingHorizontal = rectangleEdge.from[0] === rectangleEdge.to[0];
            if (doSegmentsIntersect(rectangleEdge, checkingHorizontal)) {
                return true;
            }
        }
        return false;
    }

    function getOrderedRectangleEdges(corners) {
        const xs = corners.map((c) => c[0]);
        const ys = corners.map((c) => c[1]);

        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);

        return [
            // Top Edge (Horizontal): x1 <= x2
            { from: [minX, minY], to: [maxX, minY] },

            // Bottom Edge (Horizontal): x1 <= x2
            { from: [minX, maxY], to: [maxX, maxY] },

            // Left Edge (Vertical): y1 <= y2
            { from: [minX, minY], to: [minX, maxY] },

            // Right Edge (Vertical): y1 <= y2
            { from: [maxX, minY], to: [maxX, maxY] },
        ];
    }

    function areCornersInShape(corners) {
        for (let corner of corners) {
            if (!isPointInShape(corner[0], corner[1])) {
                return false;
            }
        }
        return true;
    }

    function isPointInShape(x, y) {
        // 1. Explicitly check if point is on any edge (Boundary is "Inside")
        for (let edge of edges) {
            const isVertical = edge.from[0] === edge.to[0];
            if (isVertical) {
                if (
                    x === edge.from[0] &&
                    y >= Math.min(edge.from[1], edge.to[1]) &&
                    y <= Math.max(edge.from[1], edge.to[1])
                ) {
                    return true;
                }
            } else {
                // Horizontal edge - from/to are already sorted by X in your code (Line 21)
                if (y === edge.from[1] && x >= edge.from[0] && x <= edge.to[0]) {
                    return true;
                }
            }
        }

        if (lines.find((line) => line[0] === x && line[1] === y)) {
            return true;
        }

        let ray = { from: [x, y], to: [x, maxY + 1] };
        let intersectionCount = 0;
        for (let edge of edges) {
            if (doesSegmentIntersectVerticalRay(edge, ray)) {
                intersectionCount++;
            }
        }
        return intersectionCount % 2 === 1;
    }

    function doesSegmentIntersectVerticalRay(segment1, ray) {
        const x1 = segment1.from[0];
        const y1 = segment1.from[1];
        const x2 = segment1.to[0];
        const y2 = segment1.to[1];

        const x3 = ray.from[0];
        const y3 = ray.from[1];
        const x4 = ray.to[0];
        const y4 = ray.to[1];

        // Rays are always vertical so we can't count intersections with vertical edges
        if (x1 === x2) {
            return false;
        }

        if (x1 <= x3 && x2 > x4 && y3 < y1 && y4 > y2) {
            return true;
        }
        return false;
    }
}
