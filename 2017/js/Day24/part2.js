export default function solve({ lines, rawData }) {
    lines = lines.map((line, index) => {
        line = line.split('/').map(Number);
        return { id: index, ports: line };
    });

    const bridges = [];
    const buildBridge = (bridge, lines, ids) => {
        const last = bridge[bridge.length - 1];
        const next = lines.filter((line) => line.ports.includes(last) && !ids.includes(line.id));
        if (next.length === 0) {
            bridges.push(bridge);
            return;
        }

        next.forEach((line) => {
            const newBridge = bridge.slice();
            let port = line.ports.filter((port) => port !== last);
            let toPush = port[0] === undefined ? last : port[0];
            newBridge.push(last, toPush);
            const newIds = ids.slice();
            newIds.push(line.id);
            buildBridge(newBridge, lines, newIds);
        });
    };

    buildBridge([0], lines, []);
    const answer = bridges
        .sort((a, b) => {
            return b.length - a.length;
        })
        .filter((bridge, index, bridges) => {
            return bridge.length === bridges[0].length;
        })
        .reduce((max, bridge) => {
            const strength = bridge.reduce((strength, curr) => {
                if (curr === undefined) {
                    return strength;
                }
                return strength + curr;
            }, 0);
            return max > strength ? max : strength;
        }, 0);

    return { value: answer };
}
