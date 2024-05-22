module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const data = lines.map((x) => x.split('-'));

    // create point map
    let points = new Map();
    data.forEach((segment) => {
        segment.forEach((point, index, seg) => {
            if (!points.get(point)) {
                points.set(point, {
                    opts: [],
                });
            }
            let x = points.get(point);
            // push the other point of this segment
            x.opts.push(seg[index * -1 + 1]);
        });
    });

    let paths = 0;
    traverse('start');
    const answer = paths;

    function traverse(point, visited) {
        if (visited == null) {
            visited = ['start'];
        } else {
            visited.push(point);
        }

        if (point === 'end') {
            paths++;
            return;
        }

        points.get(point).opts.forEach((x) => {
            if (!visited.includes(x) || x !== x.toLowerCase()) {
                traverse(x, [...visited]);
            }
        });
    }
    return { value: answer };
}
