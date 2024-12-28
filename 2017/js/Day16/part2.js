export default function solve({ lines, rawData }) {
    const { floor } = Math;
    const MAX = 1000000000;
    let input = rawData.split(',');
    let programs = 'abcdefghijklmnop'.split('');

    let dance = 0;
    let seen = new Map();
    let cycleDetected = false;
    while (dance < MAX) {
        input.forEach((move) => {
            let type = move[0];
            let pos1, pos2;
            switch (type) {
                case 's':
                    let size = parseInt(move.substring(1));
                    programs = programs.slice(-size).concat(programs.slice(0, -size));
                    break;
                case 'x':
                    [pos1, pos2] = move.substring(1).split('/').map(Number);
                    [programs[pos1], programs[pos2]] = [programs[pos2], programs[pos1]];
                    break;
                case 'p':
                    let [prog1, prog2] = move.substring(1).split('/');
                    [pos1, pos2] = [programs.indexOf(prog1), programs.indexOf(prog2)];
                    [programs[pos1], programs[pos2]] = [programs[pos2], programs[pos1]];
                    break;
            }
        });

        if (!cycleDetected) {
            let key = programs.join('');
            if (seen.has(key)) {
                let diff = dance - seen.get(key);
                dance += floor((MAX - dance) / diff) * diff;
                cycleDetected = true;
            } else {
                seen.set(key, dance);
            }
        }
        dance++;
    }

    const answer = programs.join('');
    return { value: answer };
}
