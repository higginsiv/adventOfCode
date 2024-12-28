export default function solve({ lines, rawData }) {
    const depth = lines[0].match(/\d+/).map(Number)[0];
    const [targetX, targetY] = lines[1].match(/\d+/g).map(Number);

    let cache = Array.from({ length: targetY + 1 }, () =>
        Array(targetX + 1)
            .fill(null)
            .map(() => ({})),
    );

    function getErosionLevel(x, y) {
        if (cache[y][x].erosionLevel != null) {
            return cache[y][x].erosionLevel;
        }
        const erosionLevel = (getGeologicIndex(x, y) + depth) % 20183;
        cache[y][x].erosionLevel = erosionLevel;
        return erosionLevel;
    }

    function getGeologicIndex(x, y) {
        if (cache[y][x].geologicIndex != null) {
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
        if (cache[y][x].regionType != null) {
            return cache[y][x].regionType;
        }
        const regionType = getErosionLevel(x, y) % 3;
        cache[y][x].regionType = regionType;
        return regionType;
    }

    for (let y = targetY; y >= 0; y--) {
        for (let x = targetX; x >= 0; x--) {
            getRegionType(x, y);
        }
    }

    const answer = cache.reduce((acc, row) => {
        return (
            acc +
            row.reduce((acc, cell) => {
                return acc + cell.regionType;
            }, 0)
        );
    }, 0);

    return { value: answer };
}
