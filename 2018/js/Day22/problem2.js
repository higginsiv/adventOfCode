module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const [ROCKY, WET, NARROW] = [0, 1, 2];
    const [NEITHER, TORCH, CLIMBING_GEAR] = [0, 1, 2];
    const depth = lines[0].match(/\d+/).map(Number)[0];
    const [targetX, targetY] = lines[1].match(/\d+/g).map(Number);

    let base = { erosionLevel: null, geologicIndex: null, regionType: null };
    let cache = Array.from({ length: targetY + 1 }, () =>
        Array(targetX + 1)
            .fill(null)
            .map(() => ({ ...base })),
    );

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

    function findFastestPath() {
        let queue = [{ x: 0, y: 0, tool: 1, time: 0 }];

        while (queue.length > 0) {
            // TODO priority queue?
            queue.sort((a, b) => a.time - b.time);
            let { x, y, tool, time } = queue.shift();

            if (x === targetX && y === targetY && tool === TORCH) {
                return time;
            }
        }
    }



    const answer = null;

    return { value: answer };
}
