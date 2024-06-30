export default function solve({ lines, rawData }) {
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
            // grab 0 if index is 1 and 1 if index is 0
            x.opts.push(seg[index * -1 + 1]);
        });
    });

    let paths = 0;
    traverse('start');
    const answer = paths;

    function traverse(point, visited, multiSmallVisit = false) {
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
            if (
                (!visited.includes(x) || x !== x.toLowerCase() || multiSmallVisit === false) &&
                x !== 'start'
            ) {
                traverse(
                    x,
                    [...visited],
                    multiSmallVisit || (visited.includes(x) && x === x.toLowerCase()),
                );
            }
        });
    }
    return { value: answer };
}
