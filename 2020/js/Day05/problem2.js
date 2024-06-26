export default function solve({ lines, rawData }) {
    const { floor } = Math;
    const data = lines.map((x) => x.split(''));
    const [FRONT, BACK, LEFT, RIGHT] = ['F', 'B', 'L', 'R'];
    const ROWS = 127;
    const COLS = 7;
    const ROW_MULT = 8;

    let answer;
    // this should probably be a map instead of reduce but fuck it I love copy pasta
    let allIds = data.reduce((ids, curr) => {
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

        let id = rowMin * ROW_MULT + colMin;
        ids.push(id);
        return ids;
    }, []);

    allIds.sort((a, b) => a - b);

    for (let i = 0; i < allIds.length; i = i + 2) {
        if (allIds[i + 1] - allIds[i] > 1) {
            answer = allIds[i] + 1;
            break;
        }
    }

    return { value: answer };
}
