import { Solution } from '#tools/solution.js';
import { find } from 'async';

export default function solve({ lines, rawData }) {
    const { max } = Math;
    const [FOREST, PATH] = ['#', '.'];
    const DIRECTIONS = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
    ];

    // Find start and goal
    let start = { x: 0, y: 0, key: -1 };
    let goal;
    const GRID = lines.map((line, index, grid) => {
        if (index === 0) {
            start.y = line.indexOf(PATH);
        }

        if (index === grid.length - 1) {
            goal = { x: index, y: line.indexOf(PATH), key: 1000 };
        }

        line = line.split('');
        return line;
    });

    // Build graph of junctions including start and goal
    const junctionToJunctionDistances = new Map();
    const junctionQueue = [generateKey(start.x, start.y)];
    while (junctionQueue.length > 0) {
        const current = junctionQueue.pop();
        const [x, y] = current.split(',').map(Number);
        const newJunctions = findAllJunctions(x, y);
        if (newJunctions.size > 0) {
            junctionQueue.push(...newJunctions);
        }
    }

    // Traverse graph recursively to find longest path
    const answer = findLongestPath(
        generateKey(start.x, start.y),
        generateKey(goal.x, goal.y),
        0,
        new Set([generateKey(start.x, start.y)]),
    );

    return new Solution(answer);

    function findLongestPath(current, goal, totalDistance, visited) {
        if (current === goal) {
            return totalDistance;
        }

        let longestDistance = -Infinity;
        const connectedNodes = junctionToJunctionDistances.get(current);
        connectedNodes.forEach((distance, key) => {
            if (visited.has(key)) {
                return;
            }

            visited.add(key);
            longestDistance = max(
                longestDistance,
                findLongestPath(key, goal, totalDistance + distance, visited),
            );
            visited.delete(key);
        });

        return longestDistance;
    }

    function getValidNeighbors(point) {
        const neighbors = [];

        DIRECTIONS.forEach(([dx, dy]) => {
            const x = point.x + dx;
            const y = point.y + dy;

            if (x < 0 || x >= GRID.length || y < 0 || y >= GRID[0].length) {
                return;
            }

            if (GRID[x][y] === FOREST) {
                return;
            }

            if (point.visited.has(generateKey(x, y))) {
                return;
            }

            neighbors.push({ x, y });
        });

        return neighbors;
    }

    function generateKey(x, y) {
        return `${x},${y}`;
    }

    function findAllJunctions(x, y) {
        const startKey = generateKey(x, y);
        if (junctionToJunctionDistances.has(startKey)) {
            return new Set();
        }

        junctionToJunctionDistances.set(startKey, new Map());

        const junctions = new Set();
        const visited = new Set();
        visited.add(startKey);
        const stack = [{ x, y, distance: 0, visited: visited }];

        while (stack.length > 0) {
            const current = stack.pop();
            const neighbors = getValidNeighbors(current);

            if ((neighbors.length >= 2 && current.distance > 0) || neighbors.length === 0) {
                const junctionKey = generateKey(current.x, current.y);
                junctionToJunctionDistances.get(startKey).set(junctionKey, current.distance);
                junctions.add(generateKey(current.x, current.y));
                continue;
            }

            neighbors.forEach((neighbor) => {
                const newVisited = new Set(current.visited);
                newVisited.add(generateKey(neighbor.x, neighbor.y));
                stack.push({
                    x: neighbor.x,
                    y: neighbor.y,
                    distance: current.distance + 1,
                    visited: newVisited,
                });
            });
        }
        return junctions;
    }
}
