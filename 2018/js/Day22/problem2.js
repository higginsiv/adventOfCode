import PriorityQueue from '../../../tools/queue.js';
export default function solve({ lines, rawData }) {
    const { abs } = Math;
    const [ROCKY, WET, NARROW] = [0, 1, 2];
    const [NEITHER, TORCH, CLIMBING_GEAR] = [0, 1, 2];
    const depth = lines[0].match(/\d+/).map(Number)[0];
    const [targetX, targetY] = lines[1].match(/\d+/g).map(Number);

    // These multiples are from manual testing with my input. The solution will work for all inputs but may be slower for some.
    let cache = Array.from({ length: 2 * targetY }, () =>
        Array(10 * targetX)
            .fill(null)
            .map(() => {
                return { bestTime: [Infinity, Infinity, Infinity] };
            }),
    );

    function getLocation(x, y) {
        return cache[y][x];
    }

    function increaseCacheSize() {
        cache.forEach((row) => {
            row.push({ bestTime: [Infinity, Infinity, Infinity] });
        });

        cache.push(
            Array(cache[0].length + 1)
                .fill(null)
                .map(() => {
                    return { bestTime: [Infinity, Infinity, Infinity] };
                }),
        );
    }

    function getErosionLevel(x, y) {
        const location = getLocation(x, y);
        if (location.erosionLevel != null) {
            return location.erosionLevel;
        }
        const erosionLevel = (getGeologicIndex(x, y) + depth) % 20183;
        location.erosionLevel = erosionLevel;
        return erosionLevel;
    }

    function getGeologicIndex(x, y) {
        const location = getLocation(x, y);
        if (location.geologicIndex != null) {
            return location.geologicIndex;
        }
        let geologicIndex;
        if (x === 0 && y === 0) {
            geologicIndex = 0;
        } else if (x === targetX && y === targetY) {
            geologicIndex = 0;
        } else if (y === 0) {
            geologicIndex = x * 16807;
        } else if (x === 0) {
            geologicIndex = y * 48271;
        } else {
            geologicIndex = getErosionLevel(x - 1, y) * getErosionLevel(x, y - 1);
        }
        location.geologicIndex = geologicIndex;
        return geologicIndex;
    }

    function getRegionType(x, y) {
        const location = getLocation(x, y);
        if (location.regionType != null) {
            return location.regionType;
        }
        const regionType = getErosionLevel(x, y) % 3;
        location.regionType = regionType;
        return regionType;
    }

    function toolIsValid(x, y, tool) {
        const regionType = getRegionType(x, y);
        if (regionType === ROCKY) {
            return tool === TORCH || tool === CLIMBING_GEAR;
        }
        if (regionType === WET) {
            return tool === NEITHER || tool === CLIMBING_GEAR;
        }
        if (regionType === NARROW) {
            return tool === NEITHER || tool === TORCH;
        }
    }

    function switchToOtherValidTool(x, y, tool) {
        const regionType = getRegionType(x, y);
        if (regionType === ROCKY) {
            return tool === CLIMBING_GEAR ? TORCH : CLIMBING_GEAR;
        } else if (regionType === WET) {
            return tool === NEITHER ? CLIMBING_GEAR : NEITHER;
        } else {
            return tool === TORCH ? NEITHER : TORCH;
        }
    }

    function compare(a, b) {
        return f(a.x, a.y, a.tool) - f(b.x, b.y, b.tool);
    }

    function f(x, y, tool) {
        return g(x, y, tool) + h(x, y, tool);
    }

    // g(x) is the cost of the shortest path from the start to x
    function g(x, y, tool) {
        return getLocation(x, y).bestTime[tool];
    }

    // h(x) is the heuristic function. It estimates the cost of the cheapest path from x to the goal.
    function h(x, y, tool) {
        return abs(x - targetX) + abs(y - targetY) + (tool === TORCH ? 0 : 7);
    }

    function findFastestTime() {
        const deltas = [
            [0, -1],
            [0, 1],
            [-1, 0],
            [1, 0],
        ];

        let queue = new PriorityQueue({ x: 0, y: 0, tool: TORCH, time: 0 }, compare);

        while (queue.isNotEmpty()) {
            let { x, y, tool, time } = queue.next();

            if (x === targetX && y === targetY && tool === TORCH) {
                return time;
            }

            deltas.forEach(([dx, dy]) => {
                let newX = x + dx;
                let newY = y + dy;

                if (newX < 0 || newY < 0) {
                    return;
                }

                if (newX >= cache[0].length || newY >= cache.length) {
                    increaseCacheSize();
                }

                if (!toolIsValid(newX, newY, tool)) {
                    return;
                }

                let newTime = time + 1;

                const location = getLocation(newX, newY);
                if (newTime < location.bestTime[tool]) {
                    location.bestTime[tool] = newTime;
                    queue.insert({ x: newX, y: newY, tool: tool, time: newTime });
                }

                let newTool = switchToOtherValidTool(newX, newY, tool);
                newTime = time + 8;
                if (newTime < location.bestTime[newTool]) {
                    location.bestTime[newTool] = newTime;
                    queue.insert({ x: newX, y: newY, tool: newTool, time: newTime });
                }
            });
        }
    }

    const answer = findFastestTime();
    return { value: answer };
}
