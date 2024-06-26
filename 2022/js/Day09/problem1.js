export default function solve({ lines, rawData }) {
    const { abs } = Math;
    const data = lines.map((x) => x.split(' ').map((y, index) => (index === 0 ? y : parseInt(y))));

    let head = {
        x: 0,
        y: 0,
    };
    let tail = {
        x: 0,
        y: 0,
    };

    let tailVisits = new Set(['0.0']);

    data.forEach(([dir, amount]) => {
        switch (dir) {
            case 'U':
                move('y', amount);
                break;
            case 'D':
                move('y', -amount);
                break;
            case 'L':
                move('x', -amount);
                break;
            case 'R':
                move('x', amount);
                break;
        }
    });

    const answer = tailVisits.size;

    function move(axis, delta) {
        const increment = delta > 0 ? 1 : -1;
        for (let i = 0; i < abs(delta); i++) {
            head[axis] += increment;
            if (!isTouching()) {
                tail[axis] += increment;
                tail[oppositeAxis(axis)] = head[oppositeAxis(axis)];
                tailVisits.add(tail['x'].toString() + '.' + tail['y'].toString());
            }
        }
    }

    function isTouching() {
        return abs(head.x - tail.x) <= 1 && abs(head.y - tail.y) <= 1;
    }

    function oppositeAxis(axis) {
        return axis === 'x' ? 'y' : 'x';
    }

    return { value: answer };
}
