export default function solve({ lines, rawData }) {
    class Command {
        key;
        func;
        constructor(key, func) {
            this.key = key;
            this.func = func;
        }
    }
    const data = lines.map((y) => {
        let parts = y.split(': ');
        let cmd = parts[1].split(' ');

        if (cmd.length === 1) {
            y = new Command(parts[0], new Function('return ' + parseInt(parts[1])));
        } else {
            y = new Command(
                parts[0],
                new Function("return calc('" + cmd[0] + "') " + cmd[1] + " calc('" + cmd[2] + "')"),
            );
        }
        return y;
    });

    let commands = new Map();
    data.forEach((x) => {
        commands.set(x.key, x.func);
    });

    // "new Function" syntax results in functions that only have access to global scope
    global.calc = function calc(key) {
        return commands.get(key)();
    };

    const answer = calc('root');
    return { value: answer };
}
