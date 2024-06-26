export default function solve({ lines, rawData }) {
    const { floor } = Math;
    const data = lines.map((x) => x.split(''));
    const [FRONT, BACK, LEFT, RIGHT] = ['F', 'B', 'L', 'R'];
    const ROWS = 127;
    const COLS = 7;
    const ROW_MULT = 8;

    const answer = data.reduce((highest, curr) => {
        let rowMin = 0;
        let rowMax = ROWS;
        let colMin = 0;
        let colMax = COLS;

        while (rowMin !== rowMax || colMin !== colMax) {
            let midRow = rowMin + floor((rowMax - rowMin) / 2);
            let midCol = colMin + floor((colMax - colMin) / 2);
            let dir = curr.shift();
            switch (dir) {
                case FRONT:
                    rowMax = midRow;
                    break;
                case BACK:
                    rowMin = midRow + 1;
                    break;
                case LEFT:
                    colMax = midCol;
                    break;
                case RIGHT:
                    colMin = midCol + 1;
                    break;
            }
        }

        const id = rowMin * ROW_MULT + colMin;
        return highest > id ? highest : id;
    }, 0);

    return { value: answer };
}
