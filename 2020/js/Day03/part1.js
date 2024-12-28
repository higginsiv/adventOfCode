export default function solve({ lines, rawData }) {
    const data = lines.map((x) => x.split(''));
    const COLS = data[0].length;
    const ROWS = data.length;
    const TREE = '#';

    let row = 0;
    let col = 0;
    let collisions = 0;
    while (row < ROWS) {
        if (data[row][col] === TREE) {
            collisions++;
        }
        row = row + 1;
        col = (col + 3) % COLS;
    }
    const answer = collisions;
    return { value: answer };
}
