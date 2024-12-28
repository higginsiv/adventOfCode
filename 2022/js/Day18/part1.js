export default function solve({ lines, rawData }) {
    const data = lines.map((x) => x.split(',').map((y) => parseInt(y)));

    let jsonData = data.slice().map((x) => JSON.stringify(x));

    let surfaceArea = 0;
    data.forEach((p) => {
        const [x, y, z] = p;
        let freeSides = 6;
        let left = [x - 1, y, z];
        let right = [x + 1, y, z];
        let front = [x, y, z + 1];
        let back = [x, y, z - 1];
        let top = [x, y + 1, z];
        let bottom = [x, y - 1, z];
        let sides = [left, right, front, back, top, bottom];
        for (let i = 0; i < sides.length; i++) {
            if (jsonData.includes(JSON.stringify(sides[i]))) {
                freeSides--;
            }
        }
        surfaceArea += freeSides;
    });

    const answer = surfaceArea;
    return { value: answer };
}
