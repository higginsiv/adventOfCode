module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const PriorityQueue = require('../../../tools/queue');
    const { abs } = Math;
    const [ROCKY, WET, NARROW] = [0, 1, 2];
    const [NEITHER, TORCH, CLIMBING_GEAR] = [0, 1, 2];
    const depth = lines[0].match(/\d+/).map(Number)[0];
    const [targetX, targetY] = lines[1].match(/\d+/g).map(Number);

    let base = { erosionLevel: null, geologicIndex: null, regionType: null };
    let cache = Array.from({ length: targetY + 1 }, () =>
        Array(targetX + 1)
            .fill(null)
            .map(() => {
                return { ...base, bestTime: [Infinity, Infinity, Infinity] };
            }),
    );

    function increaseArraySize() {
        cache.forEach((row) => {
            row.push({ ...base, bestTime: [Infinity, Infinity, Infinity] });
        });

        cache.push(
            Array(targetX + 1)
                .fill(null)
                .map(() => {
                    return { ...base, bestTime: [Infinity, Infinity, Infinity] };
                }),
        );
    }

    function getErosionLevel(x, y) {
        if (cache[y][x].erosionLevel !== null) {
            return cache[y][x].erosionLevel;
        }
        const erosionLevel = (getGeologicIndex(x, y) + depth) % 20183;
        cache[y][x].erosionLevel = erosionLevel;
        return erosionLevel;
    }

    function getGeologicIndex(x, y) {
        if (cache[y][x].geologicIndex !== null) {
            return cache[y][x].geologicIndex;
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
        cache[y][x].geologicIndex = geologicIndex;
        return geologicIndex;
    }

    function getRegionType(x, y) {
        if (cache[y][x].regionType !== null) {
            return cache[y][x].regionType;
        }
        const regionType = getErosionLevel(x, y) % 3;
        cache[y][x].regionType = regionType;
        return regionType;
    }

    function getValidTools(x, y) {
        const regionType = getRegionType(x, y);
        if (regionType === ROCKY) {
            return [TORCH, CLIMBING_GEAR];
        } else if (regionType === WET) {
            return [NEITHER, CLIMBING_GEAR];
        } else {
            return [NEITHER, TORCH];
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

    function g(x, y, tool) {
        return cache[y][x].bestTime[tool];
    }

    function h(x, y, tool) {
        return abs(x - targetX) + abs(y - targetY) + (tool === TORCH ? 0 : 7);
    }

    function findFastestTime() {
        const deltas = [
            [0, 0],
            [0, -1],
            [0, 1],
            [-1, 0],
            [1, 0],
        ];

        let queue = new PriorityQueue({ x: 0, y: 0, tool: 1, time: 0 }, compare);

        while (queue.isNotEmpty()) {
            let { x, y, tool, time } = queue.next();

            if (x === targetX && y === targetY && tool === TORCH) {
                return time;
            }

            deltas.forEach(([dx, dy]) => {
                // stay in place and change tools
                if (dx === 0 && dy === 0) {
                    let newTool = switchToOtherValidTool(x, y, tool);
                    let newTime = time + 7;
                    if (newTime < cache[y][x].bestTime[newTool]) {
                        cache[y][x].bestTime[newTool] = newTime;
                        queue.insert({ x, y, tool: newTool, time: newTime });
                    }
                    return;
                }

                // move and stay with same tool
                let newX = x + dx;
                let newY = y + dy;

                if (newX < 0 || newY < 0) {
                    return;
                }

                if (newX >= cache[0].length || newY >= cache.length) {
                    increaseArraySize();
                }

                if (!getValidTools(newX, newY).includes(tool)) {
                    return;
                }

                let newTime = time + 1;

                if (newTime < cache[newY][newX].bestTime[tool]) {
                    cache[newY][newX].bestTime[tool] = newTime;
                    queue.insert({ x: newX, y: newY, tool: tool, time: newTime });
                }
            });
        }
    }

    const answer = findFastestTime();

    return { value: answer };
}
